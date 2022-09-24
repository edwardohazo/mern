import './CartItem.css';
import { Link } from 'react-router-dom';
 

const CartItem = () => {
    return (
        <div className="cartitem">
            <div className='cartitem__image'>
                <img src={require("../img/ecommerce-servicio.jpg")} alt="E commerce"/>
              
            </div>
            <Link to={`product/${123}`} className='cartitem__name'>
                <p>E commerce</p>
            </Link>
            <p className="cartitem__price">$20,000.00</p>
            <select className="cartItem__select">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <button className="cartItem__deletBtn" type="button">
                <i className="fas fa-trash"></i>
            </button>
        </div>
    )
}

export default CartItem;



