import { React, useState } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import "bootswatch/dist/lux/bootstrap.min.css";
import '../App.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

// CONNECTING TO AN SPECIFIC STRIPE ACCOUNT
const stripePromise = loadStripe("pk_test_51Lep4BLIEIM5XrIICZ8HDThz6ub1l1waUyely0pXQ3TY3o5Q1Q8QSWsVeJz9kImUwcX6Q9QZs5oEc6GMQB47CEcY00JRad6nrm");

// RETURNS A FORM COMPONENT
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  // GETTING GLOBAL STATE TO SET TOTAL AMOUNT
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // REQUEST FROM THE FRONTEND TO STRIPE TO GENERATE THE PAYMENT ID
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    setLoading(true);
    console.log(`The stripe payment ID is: ${paymentMethod.id}`);

    if (!error) {
      try {
        const { id } = paymentMethod;
        // REQUEST FRONTEND TO BACKEND WITH STRIPE ID 
        const {data} = await axios.post("http://localhost:3000/api/checkout", {
          id,
          amount: 20000,
        });


        console.log(data);
        elements.getElement(CardElement).clear();

        // PRUEBITA FRONT / BACK 
        // axios.get("http://localhost:5000/api/auth/loggin").then(res => console.log(res));
        // console.log("aqui estoy");

      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }
  }

  // SETTING TOTAL AMOUNT
  const getCartTotal = () => {
    let total = 0;
    cartItems.filter((item)=> total += item.price);
    return total;
  }

  return(
  <form onSubmit={handleSubmit} className='card card-body'>

    <img src={"/img/ecommerce-servicio.jpg"} alt="imagen de un sitio e-commerce" className="img-fluid" />
    <h3 className="text-center my-2">Precio: ${getCartTotal()}</h3>
      <div className="form-group">
        <CardElement className="form-control" />
      </div>
    <button className="btn btn-success" disabled={!stripe}>
      { loading ? (
        <div className="spinner-border text-light" role="status">
        <span className="sr-only"></span>
      </div>
       ) : ( 
        "Buy" 
      )}
    </button>
  </form>
  ); 
}

function Checkout() {
  return (
  <Elements stripe={stripePromise}>
    <div className="container p-4">
      <div className="row h-100">
        <div className="col-md-4 offset-md-4 h-100">
          <CheckoutForm />
        </div>
      </div>
    </div>
  </Elements>
  );
}

export default Checkout;