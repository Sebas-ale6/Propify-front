import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <span className="logo">Propify</span>
      </div>
      <div className="header-right">
        <button className="user-button">nombre usuario</button>
      </div>
    </header>
  );
};

export default Header;
