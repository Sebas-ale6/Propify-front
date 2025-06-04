
import bedImage from "../assets/fondoreserva.png";
import "../styles/LoginStyle.css";
import ReservationForm from "../components/forms/ReservationForm.jsx";
import Footer from "../components/footer/Footer";


const ReservationPage = () => {

return (
  <>
    <div className="reservation-page">
      <div className="header-image">
        <img src={bedImage} alt="Fondo de reserva" />
      </div>

      <div className="login-container">
        <ReservationForm />
      </div>
    </div>

    <Footer />
  </>
);
}

export default ReservationPage;
