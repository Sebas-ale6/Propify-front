import { useLanguage } from "../context/LanguageContext";
import "../../styles/ReservationForm.css";

const ReservationForm = ({ property }) => {
  const { t, language, setLanguage } = useLanguage();

  const handleLanguageToggle = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <div className="reservation-info">
      {/* Botón para cambiar idioma */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <button type="button" onClick={handleLanguageToggle}>
          {language === "es" ? "EN" : "ES"}
        </button>
      </div>

      {/* Información de la propiedad */}
      {property && (
        <div className="property-summary">
          <h2>{property.type} en {property.city}</h2>
          <p><strong>{t("pricePerNight")}:</strong> ${property.pricePerNight}</p>
          <p><strong>{t("capacity")}:</strong> {property.maxTenants} personas</p>
        </div>
      )}
    </div>
  );
};

export default ReservationForm;