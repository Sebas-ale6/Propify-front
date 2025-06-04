import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Button from "../buttons/Button";

import "../../styles/ReservationForm.css";

const ReservationForm = ({ estates = [] }) => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    adults: 1,
    children: 0,
    guestType: "",
    notes: "",
    termsAccepted: false, // checkbox
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
      // Enviar a backend
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSendData} className="reservation-form">
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
