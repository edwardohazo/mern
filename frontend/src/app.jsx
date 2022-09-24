import { React, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './components/checkout'
// SCREENS
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
// COMPONENTS
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import SideDrawer from './components/Sidedrawer';


function App() {

  const [sideToggle, setSideToggle] = useState(false);

  return (
  <Router>
    <main>
      <Navbar click={()=>{setSideToggle(true)}}/>
      <SideDrawer show={sideToggle} click={()=>{setSideToggle(false)}}/>
      <Backdrop show={sideToggle} click={()=>{setSideToggle(false)}}/>
      <Routes>
        <Route exact path='/' element={<HomeScreen />} />
        <Route exact path='/product/:id' element={<ProductScreen />} />
        <Route exact path='/cart' element={<CartScreen />} />
      </Routes>
    </main>
  </Router> 
    // <div>
    //   <Checkout />
    // </div>
  );
}

export default App;

