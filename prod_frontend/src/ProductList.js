import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, onDelete, onUpdate }) => {
  return (
    <div className="container">
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onDelete={onDelete} onUpdate={onUpdate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
