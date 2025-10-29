import React from 'react';
import { Navbar, Container, Badge, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logito.png';
  
function Header({ cartCount }) {
  return (
    <header>
      <Navbar style={{ backgroundColor: '#27292a' }} variant="dark" expand="lg" sticky="top" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="Logo" style={{ height: '80px', marginRight: '10px' }} />
            <span className="logo" style={{ marginRight: '8px', fontWeight: 700 }}></span>
            <span style={{ color: 'black', textShadow: '1px 1px 0px white, -1px -1px 0px white, 1px -1px 0px white, -1px 1px 0px white' }}>TIENDA LA CRIPTA</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button as={Link} to="/" className="cyborg-btn" style={{ marginRight: '10px' }}>
                Inicio
              </Button>
              <Button as={Link} to="/productos" className="cyborg-btn" style={{ marginRight: '10px' }}>
                Productos
              </Button>
              <Button as={Link} to="/carrito" className="cyborg-btn" data-testid="checkout-link">
                Carrito de Sustos{' '}
                {cartCount > 0 && <Badge pill bg="light" text="dark" data-testid="cart-badge">{cartCount}</Badge>}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
export default Header;