import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/addPropertyStyle.css";
import { useLanguage } from "../components/context/LanguageContext";

import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer";

const AddProperty = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");
  const { t, language, setLanguage } = useLanguage();

  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    type: "",
    squareMeters: "",
    pricePerNight: "",
    country: "Argentina",
    province: "",
    city: "",
    street: "",
    maxTenants: "",
    description: "",
    stateProperty: "",
    bathroom: "",
    room: "",
    streammingPlatform: "",
    pool: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      ...formData,
      squareMeters: Number(formData.squareMeters),
      pricePerNight: Number(formData.pricePerNight),
      maxTenants: Number(formData.maxTenants),
      stateProperty: Number(formData.stateProperty),
      ownerEmail: currentUser?.email || "",
    };

    try {
      // Crear propiedad
      const res = await fetch("http://localhost:5021/api/property", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok && res.status < 500) {
        const errorData = await res.json();
        console.error("Error al crear propiedad:", errorData);
        throw new Error(errorData.message || "Error al subir propiedad");
      }

      const newProperty = await res.json(); // te devuelve la propiedad creada

      // Si hay imagen, subila al servidor y registrala en BD
      if (imageFile) {
        // 1. Subir archivo a servidor
        const formDataImage = new FormData();
        formDataImage.append("file", imageFile);

        const uploadRes = await fetch(
          "http://localhost:5021/api/image/upload-image",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDataImage,
          }
        );

        if (!uploadRes.ok) throw new Error("Error al subir imagen al servidor");
        const uploadData = await uploadRes.json(); // contiene el nombre del archivo

        // 2. Registrar imagen en base de datos
        const imageSaveRes = await fetch("http://localhost:5021/api/image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: uploadData.name,
            createdDate: new Date().toISOString(),
            uuidProperty: newProperty.id, // este es el ID de la propiedad
          }),
        });

        if (!imageSaveRes.ok)
          throw new Error("Imagen subida pero no guardada en la base");
      }

      alert("Propiedad cargada con éxito");
      navigate("/my-properties");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <Header />
      <h1 className="form-title">Subir nueva propiedad</h1>
      <form onSubmit={handleSubmit} className="formulario">
        <div className="form-group">
          <label htmlFor="type">Tipo</label>
          <input
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="squareMeters">Metros cuadrados</label>
          <input
            id="squareMeters"
            name="squareMeters"
            value={formData.squareMeters}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="pricePerNight">Precio por noche</label>
          <input
            type="number"
            id="pricePerNight"
            name="pricePerNight"
            value={formData.pricePerNight}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if ((val >= 1000 && val <= 300000) || isNaN(val)) {
                setFormData((prev) => ({
                  ...prev,
                  pricePerNight: e.target.value,
                }));
              }
            }}
            min="1000"
            max="300000"
            step="1000"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">País</label>
          <input
            id="country"
            name="country"
            value={formData.country}
            readOnly
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor="province">Provincia</label>
          <input
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">Ciudad</label>
          <input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>*/}

        <div>
          <select
            id="province"
            value={formData.province}
            onChange={handleChange}
            name="province"
            required
          >
            <option value="" disabled hidden>
              {t("Lugar")}
            </option>
            {[
              "Bariloche",
              "Córdoba",
              "Mar del Plata",
              "CABA",
              "Carlos Paz",
              "Rosario",
              "El Bolsón",
              "El Calafate",
            ].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="street">Calle</label>
          <input
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxTenants">Máximo de inquilinos</label>
          <input
            type="number"
            id="maxTenants"
            name="maxTenants"
            value={formData.maxTenants}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val >= 1 || isNaN(val)) {
                setFormData((prev) => ({
                  ...prev,
                  maxTenants: e.target.value,
                }));
              }
            }}
            min="1"
            required
          />
        </div>

        <div className="form-group descripcion">
          <label htmlFor="description">Descripción</label>
          <input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stateProperty">Estado de la propiedad (número)</label>
          <input
            id="stateProperty"
            name="stateProperty"
            value={formData.stateProperty}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bathroom">Baños</label>
          <input
            id="bathroom"
            name="bathroom"
            value={formData.bathroom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="room">Habitaciones</label>
          <input
            id="room"
            name="room"
            value={formData.room}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="streammingPlatform">Plataforma de streaming</label>
          <input
            id="streammingPlatform"
            name="streammingPlatform"
            value={formData.streammingPlatform}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="pool">¿Tiene pileta?</label>
          <select
            id="pool"
            name="pool"
            value={formData.pool}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Seleccioná una opción
            </option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Imagen</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        <div className="form-actions">
          <button type="submit">Subir propiedad</button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default AddProperty;
