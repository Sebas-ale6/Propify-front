import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { property, checkin, checkout, travelers } = location.state || {};
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!property || !checkin || !checkout) {
      navigate("/"); // si no hay datos, redirigir
      return;
    }

    const start = new Date(checkin);
    const end = new Date(checkout);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const price = property.pricePerNight * nights;
    const taxes = Math.floor(price * 0.1); // 10% impuestos
    setTotal(price + taxes);
  }, [property, checkin, checkout]);

  const handleFinalizarReserva = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5021/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          propertyId: property.id,
          checkInDate: checkin,
          checkOutDate: checkout,
          numbersOfTenants: travelers,
          paymentMethod: "Transferencia", // o el que elija el usuario
        }),
      });

      if (!response.ok) throw new Error("Error al crear la reserva");

      const data = await response.json();
      console.log("Reserva creada:", data);

      // Podés redirigir a una página de confirmación
      navigate("/reservation-confirmation", { state: data });
    } catch (error) {
      console.error("Error al finalizar reserva:", error);
      alert("Hubo un problema al finalizar la reserva.");
    }
  };
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
                  id="efectivo"
                  label="Efectivo"
                  name="paymentMethod"
                  className="mb-2"
                />

                <Form.Check
                  type="radio"
                  id="nercadipago"
                  label="Mercado pago"
                  name="paymentMethod"
                  className="mb-2"
                />
                <div className="text-muted ms-4 mb-3">
                  Pago seguro en línea.Se necesita una tarjeta de crédito.
                  <a href="">Pagar</a>
                </div>

                <div className="text-muted ms-4 mb-3">
                  Tarjeta/credito -PROXIMAMENTE-
                  <br />
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
              {property?.type} en {property?.province} ({property?.city}) <br />
              Desde <strong>{checkin}</strong> hasta <strong>{checkout}</strong>
              <br />
              {travelers} viajero/s
            </div>
            <Card className="p-3 mb-3">
              <div className="d-flex justify-content-between">
                <span>Transacción:</span>
                <span>${property?.pricePerNight}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Impuestos (10%):</span>
                <span>${Math.floor(total * 0.1)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold text-success">
                <span>Total:</span>
                <span>${total}</span>
              </div>
            </Card>
            <Card className="p-2 mb-3 bg-light">
              <small>
                Si tenés alguna duda o necesitas ayuda, nuestro equipo de
                soporte está disponible para asistirte ---&gt;{" "}
                <a href="#">Contacto</a>
              </small>
            </Card>

            <Button
              variant="success"
              className="w-100"
              onClick={handleFinalizarReserva}
            >
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
