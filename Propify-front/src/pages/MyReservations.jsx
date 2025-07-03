import { useEffect, useState } from "react";
import "../styles/MyReservations.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const email = currentUser?.email;

  const getStatusText = (state) => {
    switch (state) {
      case 1:
        return "Pendiente";
      case 2:
        return "Confirmada";
      case 3:
        return "Cancelada";
      default:
        return "Desconocido";
    }
  };

  const handleCancel = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que querés cancelar esta reserva?"
    );
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:5021/api/booking/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al cancelar reserva");

      setReservations((prev) => prev.filter((r) => r.id !== id));
      alert("Reserva cancelada con éxito.");
    } catch (error) {
      console.error("Error al cancelar:", error.message);
      alert("Hubo un error al cancelar la reserva.");
    }
  };

  useEffect(() => {
    const fetchReservations = async () => {
      if (!email || !token) return;

      try {
        const res = await fetch(
          `http://localhost:5021/api/booking/email/${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Error al obtener reservas");

        const data = await res.json();
        console.log("Reservas recibidas:", data);

        const reservasDetalladas = await Promise.all(
          data.map(async (reserva) => {
            const resProp = await fetch(
              `http://localhost:5021/api/property/${reserva.propertyId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const property = await resProp.json();

            const start = new Date(reserva.checkInDate);
            const end = new Date(reserva.checkOutDate);
            const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            const subtotal = property.pricePerNight * nights;
            const taxes = Math.floor(subtotal * 0.1);
            const total = subtotal + taxes;

            return {
              ...reserva,
              property,
              nights,
              totalPrice: total,
            };
          })
        );

        setReservations(reservasDetalladas);
      } catch (error) {
        console.error("Error:", error.message);
        alert("Hubo un error al cargar tus reservas.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [token, email]);

  return (
    <div className="page-container">
      <Header />
      <h2 className="titulo-reservas">Mis Reservas</h2>
      {loading ? (
        <p className="form-message">Cargando tus reservas...</p>
      ) : reservations.length === 0 ? (
        <p className="form-message error">No tenés reservas aún.</p>
      ) : (
        <div className="lista-reservas">
          {reservations.map((reserva) => (
            <div key={reserva.id} className="reserva-card">
              <div className="card-reserva-encabezado">
                <div className="img-reserva-placeholder">
                  {reserva.property.imageNames?.length > 0 ? (
                    <img
                      src={`http://localhost:5021/api/image/${encodeURIComponent(reserva.property.imageNames[0])}`}
                      alt="Imagen de propiedad"
                      className="img-reserva"
                      onError={() => console.log("Error al cargar imagen")}
                    />
                  ) : (
                    <p>Sin imagen</p>
                  )}
                </div>
                <div className="info-reserva">
                  <h3>{reserva.property.type}</h3>
                  <p>
                    <strong>Ubicación:</strong> {reserva.property.city},{" "}
                    {reserva.property.province}
                  </p>
                  <p>
                    <strong>Descripción:</strong>{" "}
                    {reserva.property.description}
                  </p>
                  <p>
                    <strong>Ingreso:</strong>{" "}
                    {reserva.checkInDate?.split("T")[0]}
                  </p>
                  <p>
                    <strong>Salida:</strong>{" "}
                    {reserva.checkOutDate?.split("T")[0]}
                  </p>
                  <p>
                    <strong>Noches:</strong> {reserva.nights}
                  </p>
                  <p>
                    <strong>Total:</strong> ${reserva.totalPrice}
                  </p>
                  <p>
                    <strong>Estado:</strong> {getStatusText(reserva.state)}
                  </p>

                  {reserva.state !== 3 && (
                    <button
                      className="cancelar-btn"
                      onClick={() => handleCancel(reserva.id)}
                    >
                      Cancelar reserva
                    </button>
                  )}
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

export default MyReservations;

