import "./Footer.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <Link to="/">
            <img src={logo} alt="Propify Logo" className="logo-footer" />
          </Link>
          <p className="footer-email">emailayuda@propify.com.ar</p>
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

