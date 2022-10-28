import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
 
  const { data } = await axios.get(`http://localhost:3000/api/products/find/${id}`);
  
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      key: data._id,
      id: data._id,
      product: data._id,
      name: data.title,
      imageUrl: data.img,
      price: data.price,
    },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};