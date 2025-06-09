import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Button from "../buttons/Button";

import "../../styles/ReservationForm.css";

const ReservationForm = ({ property }) => {
  const { t, language, setLanguage } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    adults: 1,
    children: 0,
    guestType: "",
    notes: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSendData = (event) => {
    event.preventDefault();
    const { name, phone, email, adults, guestType, termsAccepted } = formData;

    try {
      if (!name || !phone || !email || !guestType) {
        throw new Error("Por favor completa todos los campos obligatorios.");
      }
      if (!termsAccepted) {
        throw new Error("Debes aceptar los términos y condiciones.");
      }

      console.log("Datos enviados:", formData);
      // Aquí podrías enviar los datos al backend incluyendo info de la propiedad
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLanguageToggle = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <form onSubmit={handleSendData} className="reservation-form">
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

      <div className="form-row">
        <div className="form-group">
          <label>{t("name")}:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{t("phone")}:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{t("email")}:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>{t("adults")}:</label>
          <input
            type="number"
            name="adults"
            min="1"
            value={formData.adults}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{t("children")}:</label>
          <input
            type="number"
            name="children"
            min="0"
            value={formData.children}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>{t("guestType")}:</label>
          <select name="guestType" value={formData.guestType} onChange={handleChange} required>
            <option value="" disabled>
              {t("selectGuestType")}
            </option>
            <option value="tourism">{t("tourism")}</option>
            <option value="work">{t("work")}</option>
            <option value="family">{t("family")}</option>
          </select>
        </div>
      </div>

      <div className="form-group full-width">
        <label>{t("notes")}:</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </div>

      <div className="form-group terms">
        <input
          type="checkbox"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
        />
        <label>{t("acceptTerms")}</label>
      </div>

      <Button text={t("reserve")} action={handleSendData} className="submit-button" />
    </form>
  );
};

export default ReservationForm;