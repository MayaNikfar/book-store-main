import { useState, useEffect, useRef } from 'react';
import * as itemsAPI from '../../utilities/items-api';
import * as ordersAPI from '../../utilities/orders-api';
import './NewOrderPage.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import MenuList from '../../components/MenuList/MenuList';
import CategoryList from '../../components/CategoryList/CategoryList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import Footer from '../../components/Footer/Footer';


export default function NewOrderPage({ user, setUser }) {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCat, setActiveCat] = useState('');
  const [cart, setCart] = useState(null);
  const categoriesRef = useRef([]);

  // Use the navigate function to change routes programmatically
  const navigate = useNavigate();

  async function handleAddToOrder(itemId) {
    const cart = await ordersAPI.addItemToCart(itemId);
    setCart(cart);
  }

  async function handleChangeQty(itemId, newQty) {
    const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
    setCart(updatedCart);
  }

  async function handleCheckout() {
    await ordersAPI.checkout();
    navigate('/orders');
  }
  
  useEffect(function() {
    async function getItems() {
      const items = await itemsAPI.getAll();
      categoriesRef.current = items.reduce((acc, item) => {
        const cat = item.category.name;
        return acc.includes(cat) ? acc : [...acc, cat]
      }, []);
      setMenuItems(items);
      setActiveCat(items[0].category.name);
    }
    getItems();

    async function getCart() {
      const cart = await ordersAPI.getCart();
      setCart(cart);
    }
    getCart();
  }, []);

  return (
    <>
      <div  class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between  ">
        <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link>
        <Logo />
        <UserLogOut user={user} setUser={setUser} />
      </div>
      <div>
        <CategoryList
          categories={categoriesRef.current}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
          />
      </div>
      <main className="NewOrderPage">
        <MenuList
          menuItems={menuItems.filter(item => item.category.name === activeCat)}
          handleAddToOrder={handleAddToOrder}
        />
        <OrderDetail 
          handleChangeQty={handleChangeQty} 
          order={cart} 
          handleCheckout={handleCheckout}  
        />
      </main>
      <Footer />
    </>
  );
}
