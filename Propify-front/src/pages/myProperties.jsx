import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer";

import "../styles/myPropertiesStyle.css";

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

  const handleDelete = async (id) => {
    const confirmacion = window.confirm(
      "¿Seguro que querés borrar la propiedad?"
    );
    if (!confirmacion) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5021/api/property/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al eliminar la propiedad");

      // actualiza la lista
      setProperties((prev) => prev.filter((prop) => prop.id !== id));
      alert("Propiedad eliminada correctamente");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al eliminar la propiedad");
    }
  };

  return (
    <div>
      <Header />
      <div className="encabezado-propiedades">
        <h1 className="titulo-propiedades">Mis Propiedades</h1>
        <button className="boton-propiedades" onClick={handleNewProperty}>
          + Subir nueva propiedad
        </button>
      </div>
      {properties.length === 0 ? (
        <p>No tenés propiedades cargadas todavía.</p>
      ) : (
        <div className="lista-propiedades">
          {properties.map((prop) => (
            <div key={prop.id} className="propiedades-card">
              <div className="card-encabezado">
                <div className="imagen-placeholder">
                  {/* esto para despues cuando tengamos las imagenes */}
                </div>

                <div className="info-principal">
                  <h2 className="titulo-informacion">{prop.type}</h2>
                  <p>
                    <strong>Superficie:</strong> {prop.squareMeters} m²
                  </p>
                  <p>
                    <strong>Precio por noche:</strong> ${prop.pricePerNight}
                  </p>
                  <p>
                    <strong>Máx. huéspedes:</strong> {prop.maxTenants}
                  </p>
                  <p>
                    <strong>Descripción:</strong> {prop.description}
                  </p>
                  <p>
                    <strong>Estado de la propiedad:</strong>{" "}
                    {prop.stateProperty}
                  </p>

                  <div className="botones-acciones">
                    <button
                      className="btn-editar"
                      onClick={() => navigate(`/edit-property/${prop.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-borrar"
                      onClick={() => handleDelete(prop.id)}
                    >
                      Borrar
                    </button>
                    <button
                      className="btn-reservas"
                      onClick={() =>
                        navigate(`/reservations-for-property/${prop.id}`)
                      }
                    >
                      Reservas
                    </button>
                  </div>
                </div>
              </div>

              <div className="bloque-horizontal">
                <div className="seccion-informacion">
                  <h3 className="titulo-ubicacion">Ubicación</h3>
                  <p>
                    <strong>País:</strong> {prop.country}
                  </p>
                  <p>
                    <strong>Provincia:</strong> {prop.province}
                  </p>
                  <p>
                    <strong>Ciudad:</strong> {prop.city}
                  </p>
                  <p>
                    <strong>Calle:</strong> {prop.street}
                  </p>
                </div>

                <div className="seccion-informacion">
                  <h3 className="titulo-detalles">Detalles</h3>
                  <p>
                    <strong>Habitación:</strong> {prop.room}
                  </p>
                  <p>
                    <strong>Baño:</strong> {prop.bathroom}
                  </p>
                  <p>
                    <strong>Pileta:</strong> {prop.pool}
                  </p>
                  <p>
                    <strong>Plataformas de streaming:</strong>{" "}
                    {prop.streammingPlatform}
                  </p>
                </div>

                <div className="seccion-informacion">
                  <h3 className="titulo-dueño">Información del dueño</h3>
                  <p>
                    <strong>Nombre:</strong> {prop.owner.name}{" "}
                    {prop.owner.surname}
                  </p>
                  <p>
                    <strong>Email:</strong> {prop.owner.email}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {prop.owner.numberPhone}
                  </p>
                  <p>
                    <strong>CVU:</strong> {prop.owner.cvu}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MyProperties;
