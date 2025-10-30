import { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import CheckoutPage from './components/CheckoutPage';
import Footer from './components/Footer';
import { productosChilenos } from './data/products.js';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [cart, setCart] = useLocalStorage('tienditaCart', []);
  const [notification, setNotification] = useState(null);

  const handleAddItem = (productToAdd, nativeEvent) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === productToAdd.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...productToAdd, quantity: 1 }];
    });
    if (!cart.find(item => item.id === productToAdd.id)) {
        setNotification({ nombre: productToAdd.nombre, imagen: productToAdd.imagen });
        setTimeout(() => setNotification(null), 3000);
    }
    try {
      if (nativeEvent && typeof document !== 'undefined') {
        spawnSpiritsAt(nativeEvent.clientX, nativeEvent.clientY, 20);
      }
    } catch (e) {
    }
  };

  const spawnSpiritsAt = (x, y, count = 10) => {
    if (!document) return;
    let container = document.getElementById('spirit-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'spirit-container';
      container.style.position = 'fixed';
      container.style.left = '0';
      container.style.top = '0';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.pointerEvents = 'none';
      container.style.zIndex = '3000';
      document.body.appendChild(container);
    }

  const spark = document.createElement('div');
    spark.className = 'spirit-spark';
    spark.style.left = `${x - 4}px`;
    spark.style.top = `${y - 4}px`;
    container.appendChild(spark);
  setTimeout(() => { try { spark.remove(); } catch (e) {} }, 950);

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      const isBat = Math.random() > 0.5;
      el.className = `flying-spirit ${isBat ? 'bat' : 'ghost'}`;
      const angle = Math.random() * Math.PI * 2; // 0..2PI
      const distance = 80 + Math.random() * 140; // px
      const dx = Math.round(Math.cos(angle) * distance);
      const dy = Math.round(Math.sin(angle) * distance * -1); 

      el.style.left = `${x - 24}px`;
      el.style.top = `${y - 24}px`;
      el.style.position = 'fixed';
      el.style.pointerEvents = 'none';

  const delay = (Math.random() * 0.06).toFixed(3) + 's';
  el.style.animationDelay = delay;
  el.style.animationDuration = '0.9s';

      el.style.setProperty('--dx', dx + 'px');
      el.style.setProperty('--dy', dy + 'px');
      const rot = Math.round((Math.random() - 0.5) * 720);
      el.style.setProperty('--rot', rot + 'deg');

      container.appendChild(el);
  setTimeout(() => { try { el.remove(); } catch (e) {} }, 950);
      el.addEventListener('animationend', () => { try { el.remove(); } catch (e) {} });
    }
  };

  const handleRemoveItem = (productToRemove) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === productToRemove.id);
      if (existingProduct.quantity === 1) {
        return prevCart.filter(item => item.id !== productToRemove.id);
      } else {
        return prevCart.map(item =>
          item.id === productToRemove.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const handleDeleteProduct = (productId) => setCart(prevCart => prevCart.filter(item => item.id !== productId));
  const handleClearCart = () => setCart([]);
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <div className="moon"></div>
      <div className="bat"></div>
      <div className="bat"></div>
      <div className="bat"></div>
      <div className="ghost"></div>
      <div className="ghost"></div>
      <div className="ghost"></div>
      <div className="ghost"></div>
      <div className="ghost"></div>
      <div className="ghost"></div>
      <div className="ghost"></div>
      <div className="witch"></div>
      <div className="witch"></div>
      <Header cartCount={totalCartItems} />
      {notification && (
        <Alert variant="success" style={{ position: 'fixed', top: 80, right: 20, zIndex: 1050, boxShadow: 'var(--box-shadow)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={notification.imagen} alt={notification.nombre} style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '4px' }} />
          {notification.nombre} fue agregado al carrito!
        </Alert>
      )}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={
            <Container>
              <Row>
                <Col md={8} as="section">
                  <h2 className="mb-4 ghost-text-effect terror-title">Productos Malditos de Halloween</h2>
                  <ProductList products={productosChilenos} onAddItem={handleAddItem} />
                </Col>
                <Col md={4} as="aside" className="mt-4 mt-md-0">
                  <ShoppingCart
                    cartItems={cart}
                    isSidebar={true}
                    onAddItem={handleAddItem}
                    onRemoveItem={handleRemoveItem}
                    onDeleteProduct={handleDeleteProduct}
                    onClearCart={handleClearCart}
                  />
                </Col>
              </Row>
            </Container>
          } />
          <Route path="/carrito" element={
            <Container>
              <Row>
                <Col>
                  <ShoppingCart
                    cartItems={cart}
                    isSidebar={false}
                    onAddItem={handleAddItem}
                    onRemoveItem={handleRemoveItem}
                    onDeleteProduct={handleDeleteProduct}
                    onClearCart={handleClearCart}
                  />
                </Col>
              </Row>
            </Container>
          } />
          <Route path="/checkout" element={
            <CheckoutPage
              cartItems={cart}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
              onDeleteProduct={handleDeleteProduct}
              onClearCart={handleClearCart}
            />
          } />
          <Route path="*" element={<Container><Alert variant='danger'>404: Página no encontrada</Alert></Container>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;