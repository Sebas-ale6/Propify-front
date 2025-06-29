import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/editPropertyStyle.css";

import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer";


const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:5021/api/property/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error("Error al editar propiedad:", errorData);
          throw new Error(errorData.message || "No se pudo editar la propiedad");
        }

        const data = await res.json();

        setFormData({
          type: data.type || "",
          squareMeters: data.squareMeters?.toString() || "",
          pricePerNight: data.pricePerNight?.toString() || "",
          country: data.country || "Argentina",
          province: data.province || "",
          city: data.city || "",
          street: data.street || "",
          maxTenants: data.maxTenants?.toString() || "",
          description: data.description || "",
          stateProperty: data.stateProperty?.toString() || "",
          bathroom: data.bathroom?.toString() || "",
          room: data.room?.toString() || "",
          streammingPlatform: data.streammingPlatform || "",
          pool: data.pool || "",
        });

        setLoading(false);
      } catch (error) {
        alert("Error al cargar la propiedad: " + error.message);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      squareMeters: Number(formData.squareMeters),
      pricePerNight: Number(formData.pricePerNight),
      maxTenants: Number(formData.maxTenants),
      stateProperty: Number(formData.stateProperty),
      bathroom: formData.bathroom,
      room: formData.room,
    };

    try {
      const res = await fetch(`http://localhost:5021/api/property/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("No se pudo editar la propiedad");

      alert("Propiedad actualizada correctamente");
      navigate("/my-properties");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div className="form-container">
      <Header />
      <h1 className="form-title">Editar Propiedad</h1>
      <form onSubmit={handleSubmit} className="formulario">

        <div className="form-group">
          <label>Tipo</label>
          <input name="type" value={formData.type} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Metros cuadrados</label>
          <input name="squareMeters" value={formData.squareMeters} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Precio por noche</label>
          <input
            type="number"
            name="pricePerNight"
            value={formData.pricePerNight}
            onChange={handleChange}
            min="1000"
            max="300000"
            step="1000"
            required
          />
        </div>

        <div className="form-group">
          <label>País</label>
          <input name="country" value={formData.country} readOnly />
        </div>

        <div className="form-group">
          <label>Provincia</label>
          <input name="province" value={formData.province} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Ciudad</label>
          <input name="city" value={formData.city} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Calle</label>
          <input name="street" value={formData.street} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Máximo de inquilinos</label>
          <input
            type="number"
            name="maxTenants"
            value={formData.maxTenants}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group descripcion">
          <label>Descripción</label>
          <input name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Estado de la propiedad</label>
          <input name="stateProperty" value={formData.stateProperty} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Baños</label>
          <input name="bathroom" value={formData.bathroom} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Habitaciones</label>
          <input name="room" value={formData.room} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Plataforma de streaming</label>
          <input name="streammingPlatform" value={formData.streammingPlatform} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>¿Tiene pileta?</label>
          <select name="pool" value={formData.pool} onChange={handleChange} required>
            <option value="" disabled>Seleccioná una opción</option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit">Guardar cambios</button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default EditProperty;



