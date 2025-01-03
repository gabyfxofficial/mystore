import React from "react";
import PropTypes from "prop-types";
import { useCart } from "../pages/CartContext";
import "../styles/ProductCard.css";

function ProductCard({ product }) {
  const { addToCart, addToWishlist } = useCart();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-model">Model: {product.model}</p>
      <p className="product-storage">Storage: {product.storage}</p>
      <p className="product-color">Color: {product.color}</p>
      <p className="product-price">Price: ${product.price.toFixed(2)}</p>
      <button className="add-to-cart-button" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
      <button
        className="add-to-wishlist-button"
        onClick={() => addToWishlist(product)}
      >
        Add to Wishlist
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    model: PropTypes.string,
    storage: PropTypes.string,
    color: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
