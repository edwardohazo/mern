import './CartItem.css';
import { Link } from 'react-router-dom';
 

const CartItem = ({ id, name, imageUrl, price, removeHandler }) => {
    console.log(id)
    return (
        <div className="cartitem">
            <div className='cartitem__image'>
                <img src={imageUrl} alt="E commerce"/>
              
            </div>
            <Link to={`product/${name}`} className='cartitem__name'>
                <p>{name}</p>
            </Link>
            <p className="cartitem__price">${price}</p>

            <button className="cartItem__deleteBtn" type="button" onClick={() => removeHandler(id)}>
                <i className="fas fa-trash"></i>
            </button>
        </div>
    )
}

export default CartItem;



