import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer";
import "../styles/PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { property, checkin, checkout, travelers } = location.state || {};
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Efectivo");

  useEffect(() => {
    if (!property || !checkin || !checkout) {
      navigate("/");
      return;
    }

    const start = new Date(checkin);
    const end = new Date(checkout);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const price = property.pricePerNight * nights;
    const taxes = Math.floor(price * 0.1);
    setTotal(price + taxes);
  }, [property, checkin, checkout]);

  const handleFinalizarReserva = async () => {
    try {
      const token = localStorage.getItem("token");
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (!token || !currentUser?.email) {
        alert("Debes estar logueado para realizar una reserva.");
        navigate("/login");
        return;
      }

      const body = {
        propertyId: property.id,
        clientName: currentUser.email,
        checkInDate: checkin,
        checkOutDate: checkout,
        numbersOfTenants: travelers,
        state: 2,
        paymentMethod, 
      };

      const response = await fetch("http://localhost:5021/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al crear la reserva");
      }

      alert("¡Reserva creada exitosamente!");
      navigate("/my-reservations");
    } catch (error) {
      console.error("Error al finalizar reserva:", error.message);
      alert("Hubo un problema al finalizar la reserva.");
    }
  };

  return (
    <div className="payment-container">
      <Header />

      {/* BANNER */}
      <div className="payment-banner">
        <h2>Reserva Nuestra Habitación</h2>
        <p>
          Dejá que empiece el viaje, un mundo de aventuras, relajación y recuerdos te espera.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="payment-content">
        {/* Izquierda - formulario */}
        <div className="payment-left">
          <h3 className="section-title">Método de pago</h3>

          <div className="payment-card">
            <div className="payment-methods">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Efectivo"
                  checked={paymentMethod === "Efectivo"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Efectivo
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Mercado Pago"
                  checked={paymentMethod === "Mercado Pago"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Mercado Pago
              </label>
            </div>

            <div className="payment-details">
              <label>Número de tarjeta</label>
              <input className="input" type="text" placeholder="XXXX XXXX XXXX XXXX" />

              <div className="row">
                <div style={{ flex: 1 }}>
                  <label>Código de seguridad</label>
                  <input className="input" type="text" placeholder="123" />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Fecha de vencimiento</label>
                  <input className="input" type="text" placeholder="MM/AA" />
                </div>
              </div>

              <label>Nombre en la tarjeta</label>
              <input className="input" type="text" placeholder="Nombre Apellido" />
            </div>
          </div>

          <button className="btn-back" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>

        {/* Derecha - resumen */}
        <div className="payment-right">
          <h3 className="section-title">Resumen</h3>

          <div className="summary-info">
            {property?.type} en {property?.province} ({property?.city})<br />
            Desde <strong>{checkin}</strong> hasta <strong>{checkout}</strong><br />
            {travelers} viajero/s
          </div>

          <div className="summary-card">
            <div className="summary-row">
              <span>Transacción:</span>
              <span>${property?.pricePerNight}</span>
            </div>
            <div className="summary-row">
              <span>Impuestos (10%):</span>
              <span>${Math.floor(total * 0.1)}</span>
            </div>
            <hr />
            <div className="summary-row total">
              <strong>Total:</strong>
              <strong>${total}</strong>
            </div>
          </div>

          <div className="support-box">
            <small>
              ¿Dudas o ayuda? Nuestro equipo de soporte está disponible para asistirte —{" "}
              <a href="#">Contacto</a>
            </small>
          </div>

          <button className="btn-confirm" onClick={handleFinalizarReserva}>
            Finalizar
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentPage;



