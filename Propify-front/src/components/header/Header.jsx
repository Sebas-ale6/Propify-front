import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src={logo} alt="Propify Logo" className="logo" />
        </Link>
      </div>
      <div className="header-right">
        <Link to="/" className="header-link">Página Principal</Link>
        <a href="#" className="header-link">Contacto</a>
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </header>
  );
};

export default Header;

