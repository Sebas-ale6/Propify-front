import { useEffect, useState } from "react";
import "../styles/MyReservations.css";

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

      // Filtrar la reserva cancelada del estado
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

        const reservasDetalladas = data.map((reserva) => {
          const start = new Date(reserva.checkInDate);
          const end = new Date(reserva.checkOutDate);
          const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
          const subtotal = reserva.property.pricePerNight * nights;
          const taxes = Math.floor(subtotal * 0.1);
          const total = subtotal + taxes;

          return {
            ...reserva,
            nights,
            totalPrice: total,
          };
        });

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
    <div className="reservation-form">
      <h2 style={{ textAlign: "center" }}>Mis Reservas</h2>

      {loading ? (
        <p className="form-message">Cargando tus reservas...</p>
      ) : reservations.length === 0 ? (
        <p className="form-message error">No tenés reservas aún.</p>
      ) : (
        reservations.map((reserva) => (
          <div className="form-row" key={reserva.id}>
            <div className="form-group full-width">
              <label>
                <strong>Reserva #{reserva.id}</strong>
              </label>
              <p>
                <strong>Propiedad:</strong> {reserva.property.type} en{" "}
                {reserva.property.city}, {reserva.property.province}
              </p>
              <p>
                <strong>Descripción:</strong> {reserva.property.description}
              </p>
              <p>
                <strong>Fecha de ingreso:</strong>{" "}
                {reserva.checkInDate?.split("T")[0]}
              </p>
              <p>
                <strong>Fecha de salida:</strong>{" "}
                {reserva.checkOutDate?.split("T")[0]}
              </p>
              <p>
                <strong>Noches:</strong> {reserva.nights}
              </p>
              <p>
                <strong>Precio total:</strong> ${reserva.totalPrice}
              </p>
              <p>
                <strong>Estado:</strong> {getStatusText(reserva.state)}
              </p>

              {reserva.state !== 3 && ( // Mostrar botón solo si no está cancelada
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => handleCancel(reserva.id)}
                >
                  Cancelar reserva
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReservations;
