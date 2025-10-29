import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './ProductCard.css';

export function formatPrice(price) {
  return price.toLocaleString('es-CL');
}

function ProductCard({ product, onAddItem }) {
  return (
    <Card as="article" className="product-card">
      <Card.Img variant="top" src={product.imagen} alt={product.nombre} className="card-img-top" />
      <Card.Body>
        <Card.Title as="h3">{product.nombre}</Card.Title>
        <div className="product-price mb-3">${formatPrice(product.precio)}</div>
        <div className="mt-auto">
          <Button
            className="cyborg-btn"
            onClick={(e) => onAddItem(product, e.nativeEvent)}
            data-testid={`add-to-cart-${product.id}`}
          >
            Añadir
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;