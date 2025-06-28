import { Link } from "react-router-dom";
import logo from '../../assets/logo.png'; // Ajusta la ruta según donde esté tu imagen

const Logo = () => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <img
        src={logo}
        alt="Logo-Propify"
        style={{
          height: '80px', // Ajusta el tamaño según necesites
          width: 'auto',
        }}
      />
    </Link>
  );
};

export default Logo;