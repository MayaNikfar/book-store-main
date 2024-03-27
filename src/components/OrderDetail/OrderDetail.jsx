// src/components/OrderDetail/OrderDetails.jsx

import React from 'react';
import './OrderDetail.css';
import LineItem from '../LineItem/LineItem';

export default function OrderDetail({ order, handleChangeQty, handleCheckout }) {
  if (!order) return null;

  const lineItems = order.lineItems.map(item =>
    <LineItem
      lineItem={item}
      isPaid={order.isPaid}
      handleChangeQty={handleChangeQty}
      key={item._id}
    />
  );

  const handlePayNowClick = async () => {
    try {
      const response = await fetch("/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: order.lineItems.map(item => ({ id: item._id, quantity: item.quantity })),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div className="OrderDetail">
      <div className="section-heading">
        {order.isPaid ?
          <span>ORDER <span className="smaller">{order.orderId}</span></span>
          :
          <span>NEW ORDER</span>
        }
        <span>{new Date(order.updatedAt).toLocaleDateString()}</span>
      </div>
      <div className="line-item-container flex-ctr-ctr flex-col scroll-y">
        {lineItems.length ?
          <>
            {lineItems}
            <section className="total">
              {order.isPaid ?
                <>
                  <span className="right">TOTAL&nbsp;&nbsp;</span>
                </>
                :
                <button
                  className="btn-sm"
                  onClick={handleCheckout}
                  disabled={!lineItems.length}
                >CHECKOUT</button>
              }
              <span>{order.totalQty}</span>
              <span className="right">${order.orderTotal.toFixed(2)}</span>
            </section>
          </>
          :
          <div className="nothungry">Place an order.</div>
        }
      </div>
    </div>
  );
}
