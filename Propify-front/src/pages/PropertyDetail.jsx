import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "../styles/PropertyDetailStyle.css";


const PropertyDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const [property, setProperty] = useState(state?.property || null);
  const checkin = state?.checkin;
  const checkout = state?.checkout;
  const travelers = state?.travelers;

  useEffect(() => {
    if (!property) {
      fetch(`http://localhost:5021/api/property/${id}`)
        .then((res) => res.json())
        .then((data) => setProperty(data))
        .catch((err) => console.error("Error:", err));}
    }, [id, property]);

  if (!property) return <p>Cargando propiedad...</p>;
  const handleReserve = () => {
    navigate("/payment", {
      state: {
        property,
        checkin,
        checkout,
        travelers,
      },
    });
  };
  if (!property) return <p>Cargando propiedad...</p>;
  return (
    <div className="property-detail-page">
      <Header />

      <main className="property-detail">
        <h1>{property.type?.toUpperCase()} - {property.city}</h1>
        <div className="property-content">
          <img
            src="/images/placeholder.png" // Reemplazá por la imagen real 
            alt="Foto propiedad"
            className="property-image"
          />
          <div className="property-info">
            <p>{property.description}</p>
            <p><strong>Precio por noche:</strong> ${property.pricePerNight}</p>
            <p><strong>Capacidad:</strong> {property.maxTenants} personas</p>
            <p><strong>Habitaciones:</strong> {property.room}</p>
            <p><strong>Baño:</strong> {property.bathroom}</p>
            <p><strong>Extras:</strong> Pileta: {property.pool}, Streaming: {property.streammingPlatform}</p>
            <p><strong>Provincia:</strong> {property.province}</p>
          </div>
          <div className="reserve-side">
            <button className="reserve-button" onClick={handleReserve}>
              Reservar
            </button>
          </div>
        </div>

        <section className="host-info">
          <p><strong>Anfitrión:</strong> {property.owner.name} {property.owner.surname}</p>
          <p><strong>Contacto:</strong> {property.owner.email} - {property.owner.numberPhone}</p>
        </section>

        <section className="extras">
          <p><a href="#">Políticas de cancelación y reglas básicas</a></p>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
