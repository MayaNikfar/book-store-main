import './OrderHistoryPage.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as ordersAPI from '../../utilities/orders-api';
import Logo from '../../components/Logo/Logo';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import OrderList from '../../components/OrderList/OrderList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import Footer from '../../components/Footer/Footer';

export default function OrderHistoryPage({ user, setUser }) {
  /*--- State --- */
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);

  /*--- Side Effects --- */
  useEffect(function () {
    // Load previous orders (paid)
    async function fetchOrderHistory() {
      const orders = await ordersAPI.getOrderHistory();
      setOrders(orders);
      // If no orders, activeOrder will be set to null below
      setActiveOrder(orders[0] || null);
    }
    fetchOrderHistory();
  }, []);

  /*--- Event Handlers --- */
  function handleSelectOrder(order) {
    setActiveOrder(order);
  }

  /*--- Rendered UI --- */
  return (
    <>
      <div  class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between  ">
        <Link to="/orders/new" className="button btn-sm">NEW ORDERS</Link>
        <Logo />
        <UserLogOut user={user} setUser={setUser} />
      </div>
      <main className="OrderHistoryPage">
        <OrderList
          orders={orders}
          activeOrder={activeOrder}
          handleSelectOrder={handleSelectOrder}
        />
        <OrderDetail
          order={activeOrder}
        />
      </main>
      <Footer />
    </>
  );
}