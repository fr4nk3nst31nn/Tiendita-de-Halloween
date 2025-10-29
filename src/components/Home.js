import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { productosChilenos } from '../data/products';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const payasos = [
    productosChilenos[0], // Terrifier
    productosChilenos[1], // Payaso Asesino
    productosChilenos[2], // Pennywise
  ];

  const munecos = [
    productosChilenos[3], // Chucky
    productosChilenos[4], // Annabelle
    productosChilenos[10], // Samara
  ];

  const asesinos = [
    productosChilenos[5], // Freddy Krueger
    productosChilenos[6], // Jason Voorhees
    productosChilenos[7], // Michael Myers
    productosChilenos[9], // Ghostface
  ];

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <h1 className="text-center mb-4 terror-title">Bienvenidos a la Tienda Maldita de Halloween</h1>
          <p className="text-center lead" style={{ color: 'black', textShadow: '2px 2px 4px rgba(0,0,0,0.8)', WebkitTextStroke: '1px white', padding: '15px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '10px' }}>
            Explora nuestra colección de los disfraces más terroríficos para esta temporada de Halloween
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4" style={{ color: 'white', textShadow: '2px 2px 4px #ff0000' }}>Payasos Terroríficos</h2>
          <Carousel interval={3000} className="custom-carousel">
            {payasos.map((item) => (
              <Carousel.Item key={item.id}>
                <img
                  className="d-block mx-auto"
                  src={item.imagen}
                  alt={item.nombre}
                  style={{ height: '300px', objectFit: 'contain', cursor: 'pointer' }}
                  onClick={() => navigate('/productos')}
                />
                <Carousel.Caption>
                  <h3 style={{ textShadow: '2px 2px 4px #000' }}>{item.nombre}</h3>
                  <p style={{ textShadow: '2px 2px 4px #000' }}>¡Aterroriza a todos con este escalofriante disfraz!</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4" style={{ color: 'white', textShadow: '2px 2px 4px #800080' }}>Muñecos Diabólicos</h2>
          <Carousel interval={3500} className="custom-carousel">
            {munecos.map((item) => (
              <Carousel.Item key={item.id}>
                <img
                  className="d-block mx-auto"
                  src={item.imagen}
                  alt={item.nombre}
                  style={{ height: '300px', objectFit: 'contain', cursor: 'pointer' }}
                  onClick={() => navigate('/productos')}
                />
                <Carousel.Caption>
                  <h3 style={{ textShadow: '2px 2px 4px #000' }}>{item.nombre}</h3>
                  <p style={{ textShadow: '2px 2px 4px #000' }}>Conviértete en el juguete más temido de todos</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4" style={{ color: 'white', textShadow: '2px 2px 4px #000000' }}>Asesinos Clásicos</h2>
          <Carousel interval={4000} className="custom-carousel">
            {asesinos.map((item) => (
              <Carousel.Item key={item.id}>
                <img
                  className="d-block mx-auto"
                  src={item.imagen}
                  alt={item.nombre}
                  style={{ height: '300px', objectFit: 'contain', cursor: 'pointer' }}
                  onClick={() => navigate('/productos')}
                />
                <Carousel.Caption>
                  <h3 style={{ textShadow: '2px 2px 4px #000' }}>{item.nombre}</h3>
                  <p style={{ textShadow: '2px 2px 4px #000' }}>Revive a los clásicos del terror con estos disfraces legendarios</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
