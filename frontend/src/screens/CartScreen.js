import { React, useState } from 'react';
import './CartScreen.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import CartItem from '../components/CartItem';

function CartScreen() {
  return (
    <div className='cartscreen'>
      <div className="cartscreen__left">
        <h2>Shopping cart</h2>
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
      <div className="cartscreen__right">
        <div className="cartscree__info">
          <p>Subtotal (0) items</p>
          <p>$20,000.00</p>
        </div>
        <div>
          <button>Ir al checkout</button>
        </div>
      </div>

    </div>
  );
}

export default CartScreen;