import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/logo.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <Link to="/">
            <img src={logo} alt="Propify Logo" className="logo-img" />
          </Link>
          <h5>emailayuda@propify.com.ar</h5>
        </div>

        <div className="footer-column">
          <p>Servicios</p>
          <p>Reseñas</p>
          <p>Contacto</p>
        </div>

        <div className="footer-column">
          <p>Sobre nosotros</p>
          <p>Nuestras redes</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
