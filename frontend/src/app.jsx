import { React, useState,  useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// SCREENS
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import UserListScreen  from './screens/UserListScreen';
import UsuarioIndividual from './screens/UsuarioIndividualScreen';
import AgregarUsuarioScreen from './screens/AgregarUsuarioScreen';
import EditarUsuarioScreen from './screens/EditarUsuarioScreen';
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
        <Route exact path='/checkout' element={<CheckoutScreen />} />
        <Route exact path='/users' element={<UserListScreen />} />
        <Route exact path='/individual' element={<UsuarioIndividual />} />
        <Route exact path='/adduser' element={<AgregarUsuarioScreen />} />
        <Route exact path='/edituser' element={<EditarUsuarioScreen />} /> 
      </Routes>
    </main>
  </Router> 
  );
}

export default App;






