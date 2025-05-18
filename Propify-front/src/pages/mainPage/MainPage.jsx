import { Link } from "react-router-dom";
import { useLanguage } from "../../components/context/LanguageContext";

import "./MainPageStyle.css";
import section1Image from "../../assets/cabin.png";

// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { properties } from "./PropertyData"; 

const MainPage = () => {
  const { t, language, setLanguage } = useLanguage();
  const translatedProperties = t("properties");

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
      <section className="section-2">
        <h2 className="section-title">{t("topPropertiesTitle")}</h2>
        <h3 className="caption">{t("topPropertiesCaption")}</h3>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          className="swiper-container"
        >
          {translatedProperties.map((prop, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <img src={prop.img} alt={prop.name} className="property-image" />
              <div className="property-info">
                <h4>{prop.name}</h4>
                <p className="location">{prop.location}</p>
                <p className="description">{prop.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default MainPage;