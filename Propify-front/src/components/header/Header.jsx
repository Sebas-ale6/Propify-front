import "./Header.css";
import logo from "../../assets/logo.png";


const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Propify Logo" className="logo" />
      </div>
      <div className="header-right">
        <button className="user-button">nombre usuario</button>
      </div>
    </header>
  );
};

export default Header;
