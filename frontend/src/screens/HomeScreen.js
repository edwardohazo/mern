import "./HomeScreen.css";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// COMPONENTS
import Product from "../components/Product";
// ACTIONS
import { getProducts as listProducts } from "../redux/actions/productActions.js"


const HomeScreen = () => {

  const dispatch = useDispatch();


  const getProducts = useSelector(state  => state.getProducts);
  const { products, loading, error } = getProducts; 


  useEffect( () => {
    dispatch(listProducts());
  }, [dispatch]);

  
  return (
    <div className="homescreen">
      <h2 className="homescreen__title">Servicios</h2>
      <p>Selecciona el servicio que mejor se ajuste a tu negocio</p>
      <div className="homescreen__products">
        { loading ? <h2>Loading...</h2> : error ? <h2>{error}</h2> 
        : products.map((product) => 
        <Product 
        key={product._id}
        productId={product._id}
        imageUrl={product.img}
        description={product.desc}
        price={product.price}
        name={product.title}
        />) }      
      </div>
    </div>
  );
};

export default HomeScreen;