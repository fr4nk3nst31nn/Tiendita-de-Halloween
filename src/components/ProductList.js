import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

function ProductList({ products, onAddItem }) {
  if (!Array.isArray(products) || products.length === 0) {
    return <p>No hay productos disponibles en este momento.</p>;
  }

  return (
    <div className="product-list">
      {products.map((product, index) => (
        <div key={product.id} className="product-item" style={{ animationDelay: `${index * 0.1}s` }}>
          <ProductCard product={product} onAddItem={onAddItem} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;