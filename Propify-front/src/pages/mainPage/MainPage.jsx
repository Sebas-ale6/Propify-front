import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../components/context/LanguageContext";

import "./MainPageStyle.css";
import section1Image from "../../assets/cabin.png";

// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Features from './Features';


const MainPage = () => {
  const { t, language, setLanguage } = useLanguage();
  const [selectedPlace, setSelectedPlace] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [travelers, setTravelers] = useState("");
  const translatedProperties = t("properties");

  const navigate = useNavigate();

  const handleSearch = () => {
    // Armamos la query string con los filtros seleccionados
    const queryParams = new URLSearchParams({
      destino: selectedPlace,
      checkin: checkIn,
      checkout: checkOut,
      viajeros: travelers,
    });

    // Redirigimos a la ruta /search con los parámetros
    navigate(`/search?${queryParams.toString()}`);
  };
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
            <select value={selectedPlace} onChange={(e) => setSelectedPlace(e.target.value)}>
              <option value="">{t("selectPlace")}</option>
              <option value="Bariloche">Bariloche</option>
              <option value="Cordoba">Córdoba</option>
              <option value="Buenos Aires">Buenos Aires</option>
              <option value="Mar del Plata">Mar del Plata</option>
            </select>

          </div>

          <div className="search-item">
            <label>{t("checkIn")}</label>
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          </div>

          <div className="search-item">
            <label>{t("checkOut")}</label>
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          </div>

          <div className="search-item">
            <label>{t("travelers")}</label>
            <select value={travelers} onChange={(e) => setTravelers(e.target.value)}>
              <option value="">{t("howMany")}</option>
              <option value="1">1 viajero</option>
              <option value="2">2 viajeros</option>
              <option value="3">3 viajeros</option>
              <option value="4+">4 o más</option>
            </select>
          </div>

          <button className="search-button" onClick={handleSearch}></button>

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
      <section className="section-3">
        <div className="section-3-header">
          <h2 className="section-3-title">
            Comodidades de nuestro servicio
          </h2>
          <h3 className="section-3-caption">
            Podemos recibir huéspedes por día o por estadías largas, y podemos acomodar a todo tipo de viajeros: individuales, familias, equipos, etc.
          </h3>
        </div>
        <Features />

      </section>

    </div>
  );
};

export default MainPage;