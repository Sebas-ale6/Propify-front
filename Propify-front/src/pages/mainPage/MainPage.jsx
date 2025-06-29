import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../components/context/LanguageContext";

import "./MainPageStyle.css";
import section1Image from "../../assets/cabin.png";
import Footer from "../../components/footer/Footer";
import logo from "../../assets/logo.png";
// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import Features from './Features';

const MainPage = () => {
  const [tokenState, setTokenState] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const [selectedPlace, setSelectedPlace] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [travelers, setTravelers] = useState("");
  const userName = localStorage.getItem("userName");
  const [formErrors, setFormErrors] = useState({
    selectedPlace: "",
    checkIn: "",
    checkOut: "",
    travelers: "",
  });
  const translatedProperties = t("properties");

  const navigate = useNavigate();

  const handleSearch = () => {
    const errors = {};

    if (!selectedPlace) errors.selectedPlace = "Seleccioná un destino.";
    if (!checkIn) errors.checkIn = "Seleccioná fecha de ingreso.";
    if (!checkOut) errors.checkOut = "Seleccioná fecha de egreso.";
    if (!travelers) errors.travelers = "Indicá la cantidad de viajeros.";
    if (checkIn && checkOut && checkOut < checkIn) {
      errors.checkOut = "La fecha de salida no puede ser anterior a la de entrada.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({
      selectedPlace: "",
      checkIn: "",
      checkOut: "",
      travelers: "",
    });

    const queryParams = {
      destino: selectedPlace,
      checkin: checkIn,
      checkout: checkOut,
      viajeros: travelers,
    };

    const token = localStorage.getItem("token");

    if (!token) {
      // Guardamos búsqueda pendiente y redirigimos al login
      localStorage.setItem("pendingSearch", JSON.stringify(queryParams));
      navigate("/login");
      return;
    }

    // Si está logueado, redirige con los filtros aplicados
    navigate(`/search?${new URLSearchParams(queryParams).toString()}`);
  };

  const handleLanguageToggle = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const LogOut = () => {

    window.localStorage.removeItem("token")
    console.log("sesion cerrada")
    setTokenState(null)
    setIsOwner(false);
  }

  useEffect(() => {
    let token = window.localStorage.getItem("token")
    const role = localStorage.getItem("role");
    console.log(token);
    if (token) {
      setTokenState(token)
      setIsOwner(role === "owner");
    } else {
      console.log("usuario no logueado")
    }
  }, [])

  return (
    <div>
      <section className="section-1">
        <img src={section1Image} alt="cabin" className="image-cabin" />
        <nav className="navigation-menu">
          <Link to="/"><img src={logo} alt="Propify Logo" className="logo-img" /></Link>
          <ul className="nav-links">
            <li className="language">
              <button onClick={handleLanguageToggle}>
                {language === "es" ? "EN" : "ES"}
              </button>
            </li>


            {tokenState ? <><li className="Log-out">
              <button className="nav-log-out" onClick={LogOut}>{t("Cerrar Sesión")}</button>
            </li></> : <><li className="log-in">
              <Link to="/login">{t("login")}</Link>
            </li>
              <li className="sign-up">
                <Link to="/register">{t("register")}</Link>
              </li></>}
            {isOwner && (
              <li className="my-properties">
                <Link to="/my-properties">Mis Propiedades</Link>
              </li>
            )}


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
            <select value={selectedPlace} onChange={(e) => {
              setSelectedPlace(e.target.value);
              if (formErrors.selectedPlace) {
                setFormErrors((prev) => ({ ...prev, selectedPlace: "" }));
              }
            }}>
              <option value="" disabled hidden>{t("selectPlace")}</option>
              <option value="bariloche">Bariloche</option>
              <option value="cordoba">Córdoba</option>
              <option value="buenos aires">Buenos Aires</option>
              <option value="mar del plata">Mar del Plata</option>
              <option value="caba">CABA</option>
              <option value="carlos paz">Carlos Paz</option>
              <option value="rosario">Rosario</option>
              <option value="el bolson">El Bolsón</option>
              <option value="el calafate">El Calafate</option>
              <option value="mendoza">Mendoza</option>
              <option value="tierra del fuego">Tierra del Fuego</option>
            </select>
            {formErrors.selectedPlace && (
              <div className="tooltip-error">
                {formErrors.selectedPlace}
                <span className="tooltip-arrow" />
              </div>
            )}
          </div>

          <div className="search-item">
            <label>{t("checkIn")}</label>
            <input type="date" value={checkIn} onChange={(e) => {
              setCheckIn(e.target.value);
              if (formErrors.checkIn) {
                setFormErrors((prev) => ({ ...prev, checkIn: "" }));
              }
            }} />
            {formErrors.checkIn && (
              <div className="tooltip-error">
                {formErrors.checkIn}
                <span className="tooltip-arrow" />
              </div>
            )}
          </div>

          <div className="search-item">
            <label>{t("checkOut")}</label>
            <input type="date" value={checkOut} onChange={(e) => {
              setCheckOut(e.target.value);
              if (formErrors.checkOut) {
                setFormErrors((prev) => ({ ...prev, checkOut: "" }));
              }
            }} />
            {formErrors.checkOut && (
              <div className="tooltip-error">
                {formErrors.checkOut}
                <span className="tooltip-arrow" />
              </div>
            )}
          </div>

          <div className="search-item">
            <label>{t("travelers")}</label>
            <select value={travelers} onChange={(e) => {
              setTravelers(e.target.value);
              if (formErrors.travelers) {
                setFormErrors((prev) => ({ ...prev, travelers: "" }));
              }
            }}>
              <option value="" disabled hidden>{t("howMany")}</option>
              <option value="1">1 viajero</option>
              <option value="2">2 viajeros</option>
              <option value="3">3 viajeros</option>
              <option value="4+">4 o más</option>
            </select>
            {formErrors.travelers && (
              <div className="tooltip-error">
                {formErrors.travelers}
                <span className="tooltip-arrow" />
              </div>
            )}
          </div>

          <button className="search-button" onClick={handleSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="26"
              height="26"
              fill="white"
              className="search-icon"
            >
              <path d="M505 442.7L405.3 343c28.4-34.9 45.7-79 45.7-127C451 96.5 354.5 0 233.5 0S16 96.5 16 216.5 112.5 433 233.5 433c48 0 92.1-17.3 127-45.7L442.7 505c10 10 26.2 10 36.2 0l26.1-26.1c10-10 10-26.2 0-36.2zM233.5 367c-83 0-150.5-67.5-150.5-150.5S150.5 66 233.5 66s150.5 67.5 150.5 150.5S316.5 367 233.5 367z" />
            </svg>
          </button>

        </div>
      </section>

      <section className="section-2">
        <h2 className="section-title">{t("topPropertiesTitle")}</h2>
        <h3 className="caption">{t("topPropertiesCaption")}</h3>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={5}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation
          /*pagination={{ clickable: true }}*/
          loop={true}
          className="swiper-container"
        >
          {translatedProperties.map((prop, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <img src={prop.img} alt={prop.name} className="property-image" />
              {/* <div className="property-info">
                <h4>{prop.name}</h4>
                <p className="location">{prop.location}</p>
                <p className="description">{prop.description}</p>
              </div> */}
            </SwiperSlide>
          ))}
        </Swiper>



      </section>

      <section className="section-3">
          <div className="section-3-header">
        <h2 className="section-3-title">{t("serviceTitle")}</h2>
        <h3 className="section-3-caption">{t("serviceCaption")}</h3>
      </div>
        <Features />
      </section>
      <Footer />
    </div>
  );
};

export default MainPage;
