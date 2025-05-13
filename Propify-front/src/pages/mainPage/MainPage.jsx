import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

import "./MainPageStyle.css";
import section1Image from "../../assets/cabin.png";

const MainPage = () => {
  const { t, language, setLanguage } = useLanguage();

  const handleLanguageToggle = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <div>
      <section className="section-1">
        <img src={section1Image} alt="cabin" className="image-cabin" />
        <nav className="navigation-menu">
          <h4 className="logo">{t("logo")}</h4>
          <ul className="nav-links">
            <li className="language">
              <button onClick={handleLanguageToggle}>
                {language === "es" ? "EN" : "ES"}
              </button>
            </li>
            <li className="log-in">
              <Link to="/login">{t("login")}</Link>
            </li>
            <li className="sign-up">
              <Link to="/register">{t("register")}</Link>
            </li>
            <li className="my-reservations">
              <a href="#reservations">{t("reservations")}</a>
            </li>
          </ul>
        </nav>

        <div className="text-container">
          <h1>{t("mainTitle")}</h1>
          <p>{t("mainParagraph")}</p>
        </div>

        <div className="search-bar-airbnb">
          <div className="search-item">
            <label>{t("place")}</label>
            <p>{t("exploreDestinations")}</p>
          </div>
          <div className="search-item">
            <label>{t("checkIn")}</label>
            <p>{t("when")}</p>
          </div>
          <div className="search-item">
            <label>{t("checkOut")}</label>
            <p>{t("when")}</p>
          </div>
          <div className="search-item">
            <label>{t("travelers")}</label>
            <p>{t("howMany")}</p>
          </div>
          <button className="search-button"></button>
        </div>
      </section>
    </div>
  );
};

export default MainPage;