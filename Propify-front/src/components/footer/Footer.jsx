import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h2>Propify</h2>
          <h5>emailayuda@propify.com.ar</h5>
        </div>

        <div className="footer-column">
          <p>Sobre nosotros</p>
          <p>Servicios</p>
          <p>Reseñas</p>
          <p>Contacto</p>
        </div>

        <div className="footer-column">
          <p>Nuestras redes</p>
          <label htmlFor="language-select">Lenguaje</label>
          <select id="language-select">
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

