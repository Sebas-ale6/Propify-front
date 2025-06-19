import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/addPropertyStyle.css"

const AddProperty = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));;
  const token = localStorage.getItem("token");

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
      const res = await fetch("http://localhost:5021/api/property", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error al crear propiedad:", errorData);
        throw new Error(errorData.message || "Error al subir propiedad");
      }

      alert("Propiedad cargada con éxito");
      navigate("/my-properties");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Subir nueva propiedad</h1>
      <form onSubmit={handleSubmit} className="formulario">
        <div className="form-group">
          <label htmlFor="type">Tipo</label>
          <input id="type" name="type" value={formData.type} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="squareMeters">Metros cuadrados</label>
          <input id="squareMeters" name="squareMeters" value={formData.squareMeters} onChange={handleChange} required />
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
                setFormData((prev) => ({ ...prev, pricePerNight: e.target.value }));
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
          <input id="country" name="country" value={formData.country} readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="province">Provincia</label>
          <input id="province" name="province" value={formData.province} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="city">Ciudad</label>
          <input id="city" name="city" value={formData.city} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="street">Calle</label>
          <input id="street" name="street" value={formData.street} onChange={handleChange} required />
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
                setFormData((prev) => ({ ...prev, maxTenants: e.target.value }));
              }
            }}
            min="1"
            required
          />
        </div>

        <div className="form-group descripcion">
          <label htmlFor="description">Descripción</label>
          <input id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="stateProperty">Estado de la propiedad (número)</label>
          <input id="stateProperty" name="stateProperty" value={formData.stateProperty} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="bathroom">Baños</label>
          <input id="bathroom" name="bathroom" value={formData.bathroom} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="room">Habitaciones</label>
          <input id="room" name="room" value={formData.room} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="streammingPlatform">Plataforma de streaming</label>
          <input id="streammingPlatform" name="streammingPlatform" value={formData.streammingPlatform} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="pool">¿Tiene pileta?</label>
          <select id="pool" name="pool" value={formData.pool} onChange={handleChange} required>
            <option value="" disabled>Seleccioná una opción</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit">Subir propiedad</button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;


