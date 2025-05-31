import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);

  const navigate = useNavigate();

  const handleNewProperty = () => {
    navigate("/add-properties");
    };


  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = localStorage.getItem("token");

    if (!currentUser || !token) return;

    fetch("http://localhost:5021/api/property", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al traer propiedades");
        return res.json();
      })
      .then((data) => {
        const myProps = data.filter(
          (property) => property.ownerId === currentUser.id
        );
        setProperties(myProps);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
      <div>
        <button onClick={handleNewProperty}>
        + Subir nueva propiedad
        </button>

      <h1>Mis Propiedades</h1>
      {properties.length === 0 ? (
        <p>No tenés propiedades cargadas todavía.</p>
      ) : (
        <div className="properties-list">
          {properties.map((prop) => (
            <div
              key={prop.id}
              className="property-card"
              style={{
                border: "1px solid #ccc",
                padding: "1.5rem",
                marginBottom: "2rem",
                borderRadius: "10px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h2>{prop.type}</h2>
              <p><strong>Superficie:</strong> {prop.squareMeters} m²</p>
              <p><strong>Precio por noche:</strong> ${prop.pricePerNight}</p>
              <p><strong>Máx. huéspedes:</strong> {prop.maxTenants}</p>
              <p><strong>Descripción:</strong> {prop.description}</p>
              <p><strong>Estado de la propiedad:</strong> {prop.stateProperty}</p>

              <h3>Ubicación</h3>
              <p><strong>País:</strong> {prop.country}</p>
              <p><strong>Provincia:</strong> {prop.province}</p>
              <p><strong>Ciudad:</strong> {prop.city}</p>
              <p><strong>Calle:</strong> {prop.street}</p>

              <h3>Detalles</h3>
              <p><strong>Habitación:</strong> {prop.room}</p>
              <p><strong>Baño:</strong> {prop.bathroom}</p>
              <p><strong>Pileta:</strong> {prop.pool}</p>
              <p><strong>Plataformas de streaming:</strong> {prop.streammingPlatform}</p>

              <h3>Información del dueño</h3>
              <p><strong>Nombre:</strong> {prop.owner.name} {prop.owner.surname}</p>
              <p><strong>Email:</strong> {prop.owner.email}</p>
              <p><strong>Teléfono:</strong> {prop.owner.numberPhone}</p>
              <p><strong>CVU:</strong> {prop.owner.cvu}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;

