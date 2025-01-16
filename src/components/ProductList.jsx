import React from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

function ProductList({ products }) {
  const validProducts = Array.isArray(products) ? products : [];

  return (
    <main className="product-list">
      {validProducts.length > 0 ? (
        validProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p role="alert" className="no-products-message">
          No products found matching your filters.
        </p>
      )}
    </main>
  );
}

// Default Props
ProductList.defaultProps = {
  products: [],
};

// Prop Types
ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      model: PropTypes.string,
      storage: PropTypes.string,
      color: PropTypes.string,
    })
  ),
};

export default ProductList;
