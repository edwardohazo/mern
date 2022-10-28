import "./Navbar.css";
import '../app';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const Navbar = ({ click }) => {

  const cart = useSelector(state => state.cart);
  
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h2>CODEX | <span>Web Design</span></h2>
      </div>

      <ul className="navbar__links">
        <li>
          <Link to="/individual">Login</Link>
        </li>
        <li>
          <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart <span className="cartlogo__badge">{cart.cartItems.length}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">Shop</Link>
        </li>
      </ul>

      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;