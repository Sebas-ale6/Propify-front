import { useEffect, useState } from "react";
import "../styles/MyReservations.css";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser?.id;

  const getStatusText = (state) => {
    switch (state) {
      case 1: return "Pendiente";
      case 2: return "Confirmada";
      case 3: return "Cancelada";
      default: return "Desconocido";
    }
  };

  useEffect(() => {
    const fetchReservations = async () => {
      if (!userId || !token) return;

      try {
        // Trae solo las reservas del usuario actual
        const res = await fetch(`http://localhost:5021/api/booking/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener reservas");

        const data = await res.json();

        // 🔁 Para cada reserva, pedir la propiedad asociada
        const reservasConDescripcion = await Promise.all(
          data.map(async (reserva) => {
            try {
              const propertyRes = await fetch(`http://localhost:5021/api/property/${reserva.propertyId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              if (!propertyRes.ok) throw new Error("No se pudo cargar propiedad");

              const propertyData = await propertyRes.json();

              return {
                ...reserva,
                propertyDescription: propertyData.description || "Sin descripción",
              };
            } catch (error) {
              console.warn(`Error al traer propiedad ${reserva.propertyId}:`, error.message);
              return {
                ...reserva,
                propertyDescription: "No disponible",
              };
            }
          })
        );

        setReservations(reservasConDescripcion);
      } catch (error) {
        console.error("Error:", error.message);
        alert("Hubo un error al cargar tus reservas.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [token, userId]);

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
              <label><strong>Reserva #{reserva.id}</strong></label>
              <p><strong>Propiedad:</strong> {reserva.propertyDescription}</p>
              <p><strong>Fecha de ingreso:</strong> {reserva.checkInDate?.split("T")[0]}</p>
              <p><strong>Fecha de salida:</strong> {reserva.checkOutDate?.split("T")[0]}</p>
              <p><strong>Estado:</strong> {getStatusText(reserva.state)}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReservations;