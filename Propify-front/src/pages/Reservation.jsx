import { useParams, useLocation } from "react-router-dom";
import bedImage from "../assets/fondoreserva.png";
import "../styles/LoginStyle.css";
import ReservationForm from "../components/forms/ReservationForm.jsx";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header.jsx";

const ReservationPage = () => {
  const { id } = useParams();
  const { state: property } = useLocation();

  return (
    <>
      <Header />
      <div className="reservation-page">
        <div className="header-image">
          <img src={bedImage} alt="Fondo de reserva" />
        </div>

        <div className="login-container">
          <ReservationForm property={property} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReservationPage;