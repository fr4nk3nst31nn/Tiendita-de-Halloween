import React from 'react';
import { ListGroup, Card, Alert, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

function ShoppingCart({ cartItems, isSidebar = false, onAddItem, onRemoveItem, onDeleteProduct, onClearCart }) {
  const total = cartItems.reduce((sum, item) => sum + item.precio * item.quantity, 0);

  if (isSidebar && cartItems.length === 0) {
    return (
      <Card className="shadow-sm bg-dark text-white">
        <Card.Header>Carrito</Card.Header>
        <Card.Body><Alert variant="secondary" className='p-2 m-0 text-center'>El carrito está vacío.</Alert></Card.Body>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm cart-card">
      <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
        {isSidebar ? 'Resumen' : 'Tu Carrito'}
        {cartItems.length > 0 && (
          <Button variant="outline-danger" size="sm" onClick={onClearCart}>
            Vaciar
          </Button>
        )}
      </Card.Header>
      <Card.Body>
        {cartItems.length === 0 ? (
          <Alert variant="info">Tu carrito está vacío.</Alert>
        ) : (
          <>
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center bg-dark text-white">
                  <div className="d-flex align-items-center flex-grow-1 me-2">
                    <img src={item.imagen} alt={item.nombre} style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '4px', marginRight: '10px' }} />
                    <span>{item.nombre}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <ButtonGroup size="sm" className="me-2">
                      <Button variant="outline-light" onClick={() => onRemoveItem(item)}>-</Button>
                      <Button variant="dark" disabled>{item.quantity}</Button>
                      <Button variant="outline-light" onClick={(e) => onAddItem(item, e.nativeEvent)}>+</Button>
                    </ButtonGroup>
                    <Button variant="danger" size="sm" onClick={() => onDeleteProduct(item.id)}>&times;</Button>
                  </div>
                </ListGroup.Item>
              ))}
              <ListGroup.Item className="d-flex justify-content-between align-items-center fw-bold bg-secondary text-white">
                Total: <span>${total.toLocaleString('es-CL')}</span>
              </ListGroup.Item>
            </ListGroup>
            {isSidebar ? (
              <Button as={Link} to="/checkout" className='cyborg-btn mt-3 w-100'>Finalizar</Button>
            ) : (
              <div className="mt-4"><h6 className="mb-3">Tus Datos</h6><CheckoutForm /></div>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
}
export default ShoppingCart;