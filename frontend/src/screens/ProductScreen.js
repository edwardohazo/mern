import "./ProductScreen.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


// Actions
import { getProductDetails } from "../redux/actions/productActions"
import { addToCart } from "../redux/actions/cartActions";
import { useParams } from "react-router-dom";

const ProductScreen = () => {

  const params = useParams();
  let navigate = useNavigate();


  const dispatch = useDispatch();
 
  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;
  
  useEffect(() => {
    if (product && params.id !== product._id) {
      dispatch(getProductDetails(params.id));
    }
  }, [dispatch, params, product]);
  
  // EXECUTES AN ACTIN ON cartActions.js AND SEND USER TO CART SCREEN
  const addToCartHandler = () => {
    dispatch(addToCart(product._id));
    navigate(`/cart`);
  };

  

  return (
    <div className="productscreen">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="productscreen__left">
            <div className="left__image">
              <img src={product.img} alt={product.name} />
            </div>
            <div className="left__info">
              <p className="left__name">{product.name}</p>
              <p>Price: ${product.price}</p>
              <p>Description: {product.desc}</p>
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              <p>
                Price:
                <span>${product.price}</span>
              </p>
              <p>
                <button type="button" onClick={addToCartHandler}>
                  Add To Cart
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;