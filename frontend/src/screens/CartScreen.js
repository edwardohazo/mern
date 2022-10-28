import './CartScreen.css';
import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

// Components
import CartItem from '../components/CartItem';

// Actions
import { removeFromCart } from "../redux/actions/cartActions";

function CartScreen() {

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  }
  
  const getCartCount = () => {
    return cartItems.length;
  }

  const getCartTotal = () => {
    let total = 0;
    cartItems.filter((item)=> total += item.price);
    return total;
  }
  
  getCartTotal();
  return (
    <div className='cartscreen'>
      <div className="cartscreen__left">
        <h2>Shopping cart</h2>
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/">Go Back</Link>
          </div>
        ) : ( cartItems.map( (item) => <CartItem 
        key={item.id}
        id={item.id}
        name={item.name}
        imageUrl={item.imageUrl}
        price={item.price}
        removeHandler={removeHandler}/>)
        )}
      </div>
      <div className="cartscreen__right">
        <div className="cartscree__info">
          <p>Subtotal ({getCartCount()}) items</p>
          <p>${getCartTotal()}</p>
        </div>
        <div>
          <div>
            <Link to="/checkout">Ir al Checkout</Link>
          </div>
        </div>
      </div>

    </div>
  );
}

export default CartScreen;

// {cartItems.lenght !== 0 ? console.log("si paso") : console.log("no paso")}