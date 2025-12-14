import { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button, Form } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import ProductList from './components/ProductList'; // Asegúrate que este componente use props.products
import ShoppingCart from './components/ShoppingCart';
import CheckoutPage from './components/CheckoutPage';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';

// Si falla la API, usamos datos locales de emergencia
import { productosChilenos } from './data/products.js'; 

function App() {
  // --- ESTADOS ---
  const [cart, setCart] = useLocalStorage('tienditaCart', []);
  const [notification, setNotification] = useState(null);
  
  // Estado para productos del Backend
  const [products, setProducts] = useState([]);
  
  // Estado para usuario (Simulación de Login/JWT)
  const [user, setUser] = useState(null);
  const [usernameInput, setUsernameInput] = useState("");

  // --- 1. CARGAR PRODUCTOS DESDE BACKEND (INTEGRACIÓN) ---
  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then(response => {
        if (!response.ok) throw new Error("Fallo conexión");
        return response.json();
      })
      .then(data => {
        console.log("Productos cargados:", data);
        setProducts(data.length > 0 ? data : productosChilenos);
      })
      .catch(error => {
        console.error("Error conectando a Spring Boot:", error);
        // Fallback: Si no hay backend, mostramos los locales
        setProducts(productosChilenos);
      });

    // Recuperar sesión si existe
    const storedUser = localStorage.getItem('userHalloween');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // --- 2. SISTEMA DE LOGIN (SIMULACIÓN SEGURIDAD) ---
  const handleLogin = (e) => {
    e.preventDefault();
    // Si escribe "admin", es ADMIN. Si no, es USER.
    const role = usernameInput.toLowerCase() === 'admin' ? 'ADMIN' : 'USER';
    const fakeUserData = { name: usernameInput, role: role };
    
    setUser(fakeUserData);
    localStorage.setItem('userHalloween', JSON.stringify(fakeUserData));
    setUsernameInput("");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('userHalloween');
  };

  // --- 3. FUNCIONES DEL CARRITO ---
  const handleAddItem = (productToAdd) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === productToAdd.id);
      return exist 
        ? prev.map(i => i.id === productToAdd.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...productToAdd, quantity: 1 }];
    });
    setNotification({ nombre: productToAdd.nombre, imagen: productToAdd.imagen });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRemoveItem = (p) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === p.id);
      return exist.quantity === 1 
        ? prev.filter(i => i.id !== p.id) 
        : prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity - 1 } : i);
    });
  };

  // Función para ELIMINAR producto (Solo Admin)
  const handleDeleteFromCatalog = (id) => {
      // Aquí haríamos fetch(`.../${id}`, { method: 'DELETE' })
      // Hacemos la eliminación visual
      setProducts(prev => prev.filter(p => p.id !== id));
      alert("Producto eliminado (Simulación)");
  };

  const handleDeleteCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const handleClearCart = () => setCart([]);
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header cartCount={totalItems} />

      {/* BARRA DE LOGIN PARA DEMOSTRACIÓN */}
      <Container className="my-3 d-flex justify-content-end">
        {user ? (
          <Alert variant="info" className="p-2 mb-0 d-flex align-items-center gap-2">
            👻 Usuario: <strong>{user.name}</strong> | Rol: <strong>{user.role}</strong>
            <Button size="sm" variant="outline-dark" onClick={handleLogout}>Salir</Button>
          </Alert>
        ) : (
          <Form onSubmit={handleLogin} className="d-flex gap-2">
            <Form.Control 
              size="sm" placeholder="Usuario (prueba 'admin')" 
              value={usernameInput} onChange={e => setUsernameInput(e.target.value)} 
              style={{width: '200px'}}
            />
            <Button type="submit" size="sm" variant="success">Login</Button>
          </Form>
        )}
      </Container>

      {notification && <Alert variant="success" className="fixed-top mt-5 mx-auto w-50">{notification.nombre} agregado!</Alert>}

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={
            <Container>
              <Row>
                <Col md={8}>
                  <h2 className="mb-4 text-white">Catálogo de Terror</h2>
                  <div className="d-flex flex-wrap gap-3">
                    {/* Renderizamos los productos */}
                    {products.map(p => (
                      <div key={p.id} className="card p-2" style={{width: '18rem'}}>
                        <img src={p.imagen} className="card-img-top" alt={p.nombre} style={{height: '200px', objectFit: 'contain'}} />
                        <div className="card-body">
                          <h5 className="card-title">{p.nombre}</h5>
                          <p className="card-text text-danger fs-4">${p.precio}</p>
                          <Button variant="primary" onClick={() => handleAddItem(p)}>Comprar</Button>
                          
                          {/* BOTÓN SOLO PARA ADMIN (Punto 6 Rúbrica) */}
                          {user?.role === 'ADMIN' && (
                              <Button variant="danger" className="ms-2" onClick={() => handleDeleteFromCatalog(p.id)}>Borrar</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Col>
                <Col md={4}>
                  <ShoppingCart 
                    cartItems={cart} isSidebar={true} 
                    onAddItem={handleAddItem} onRemoveItem={handleRemoveItem} 
                    onDeleteProduct={handleDeleteCart} onClearCart={handleClearCart} 
                  />
                </Col>
              </Row>
            </Container>
          } />
          <Route path="/carrito" element={<CheckoutPage cartItems={cart} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
