import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ReservationsForProperty.css"; // Asegurate de crear este archivo para los estilos

const ReservationsForProperty = () => {
  const { propertyId } = useParams();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch(
          `http://localhost:5021/api/booking/property/${propertyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("No se pudieron obtener las reservas");

        const data = await res.json();
        setReservations(data);
      } catch (error) {
        console.error("Error al obtener reservas:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [propertyId]);

  return (
    <div className="reservations-container">
      <h2 className="title">Reservas para la Propiedad #{propertyId}</h2>
      {loading ? (
        <p className="loading">Cargando reservas...</p>
      ) : reservations.length === 0 ? (
        <p className="no-reservations">No hay reservas para esta propiedad.</p>
      ) : (
        <div className="reservations-list">
          {reservations.map((reserva) => (
            <div key={reserva.id} className="reservation-card">
              <h3>Reserva #{reserva.id}</h3>
              <p>
                <strong>Email del cliente:</strong> {reserva.clientName}
              </p>
              <p>
                <strong>Ingreso:</strong> {reserva.checkInDate?.split("T")[0]}
              </p>
              <p>
                <strong>Salida:</strong> {reserva.checkOutDate?.split("T")[0]}
              </p>
              <p>
                <strong>Inquilinos:</strong> {reserva.numbersOfTenants}
              </p>
              <p>
                <strong>Estado de aprobación:</strong>{" "}
                {reserva.approval || "pendiente"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationsForProperty;
