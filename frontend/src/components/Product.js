import "./Product.css";
import { Link } from "react-router-dom";

const Product = ({ imageUrl, description, price, name, productId }) => {

  return (
    <div className="product">
      <img src={imageUrl} alt={""} />

      <div className="product__info">
        <p className="info__name">{" Ecommerce "}</p>

        <p className="info__description">...</p>

        <p className="info__price">${20000}</p>

        <Link to={`/product/${123}`} className="info__button">
          View
        </Link>
      </div>
    </div>
  );
};

export default Product;