import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ShoppingCart from './ShoppingCart';

function CheckoutPage({ cartItems, onAddItem, onRemoveItem, onDeleteProduct, onClearCart }) {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={10} xl={8}>
                    <h2 className="mb-4">Finalizar Hechizo 🧙‍♀️</h2>
                    <ShoppingCart
                      cartItems={cartItems}
                      isSidebar={false}
                      onAddItem={onAddItem}
                      onRemoveItem={onRemoveItem}
                      onDeleteProduct={onDeleteProduct}
                      onClearCart={onClearCart}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default CheckoutPage;