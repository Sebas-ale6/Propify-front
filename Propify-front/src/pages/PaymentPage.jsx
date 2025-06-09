import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "../styles/PaymentPage.css";

const PaymentPage = () => {
  return (
    <div className="payment-page">
      {/* Header */}
      <div className="custom-header">
        <Container fluid>
          <Row className="align-items-center">
            <Col md={4}>
              <span className="logo">Logo - Nombre</span>
            </Col>
            <Col md={4} className="text-center">
              <Button variant="outline-light" className="lang-button">
                ES
              </Button>
            </Col>
            <Col md={4} className="text-end">
              <Button variant="secondary" className="username-button">
                nombre de usuario
              </Button>
            </Col>
          </Row>
        </Container>

        {/* Banner */}
        <div className="banner">
          <h2>Reserva Nuestra Habitación</h2>
          <p>
            Dejá que empiece el viaje, un mundo de aventuras, relajación y
            recuerdos te espera.
          </p>
        </div>
      </div>

      {/* Formulario de pago y resumen */}
      <Container className="mt-4">
        <Row>
          <Col md={7}>
            <h3>Elegí tu método de pago</h3>
            <Card className="p-3 mb-3">
              <Form>
                <Form.Check
                  type="radio"
                  id="paypal"
                  label="Paypal"
                  name="paymentMethod"
                  className="mb-2"
                />
                <div className="text-muted ms-4 mb-3">
                  Pago seguro en línea. Se necesita una tarjeta de crédito.
                </div>

                <Form.Check
                  type="radio"
                  id="creditCard"
                  label="Tarjeta de crédito"
                  name="paymentMethod"
                  className="mb-2"
                />
                <div className="text-muted ms-4 mb-3">
                  Transferencia segura de dinero usando tu cuenta bancaria.
                </div>

                <Form.Group controlId="cardNumber" className="mb-3">
                  <Form.Label>Número de tarjeta de crédito</Form.Label>
                  <Form.Control type="text" placeholder="XXXX XXXX XXXX XXXX" />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group controlId="securityCode" className="mb-3">
                      <Form.Label>Código de seguridad</Form.Label>
                      <Form.Control type="text" placeholder="123" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="expiryDate" className="mb-3">
                      <Form.Label>Fecha de vencimiento</Form.Label>
                      <Form.Control type="text" placeholder="MM/AA" />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="cardName" className="mb-3">
                  <Form.Label>Nombre en la tarjeta</Form.Label>
                  <Form.Control type="text" placeholder="Nombre Apellido" />
                </Form.Group>
              </Form>
            </Card>

            <Button variant="secondary">Volver</Button>
          </Col>

          <Col md={5}>
            <h3>Resumen</h3>
            <div className="text-muted mb-3">
              *Datos de la habitación, duración del viaje, destino, etc...*
            </div>
            <Card className="p-3 mb-3">
              <div className="d-flex justify-content-between">
                <span>Transacción:</span>
                <span>$0</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Descuento por puntos:</span>
                <span>$0.00</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Descuento por tarjeta de regalo:</span>
                <span>$0.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold text-success">
                <span>Total:</span>
                <span>$0</span>
              </div>
            </Card>
            <Card className="p-2 mb-3 bg-light">
              <small>
                Si tenés alguna duda o necesitas ayuda, nuestro equipo de
                soporte está disponible para asistirte ---&gt;{" "}
                <a href="#">Contacto</a>
              </small>
            </Card>

            <Button variant="success" className="w-100">
              Finalizar
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="footer">
        <Container>
          <Row>
            <Col md={4}>
              <p>Logo - Nombre</p>
            </Col>
            <Col md={4}>
              <ul className="footer-links">
                <li>Sobre nosotros</li>
                <li>Servicios</li>
                <li>Reseñas</li>
                <li>Contacto</li>
              </ul>
            </Col>
            <Col md={4}>
              <p>Nuestras redes</p>
              <Form.Select size="sm" className="w-auto">
                <option>Español</option>
                <option>English</option>
              </Form.Select>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default PaymentPage;
