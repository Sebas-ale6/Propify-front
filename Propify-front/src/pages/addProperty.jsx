import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
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
    <div>
      <h1>Subir nueva propiedad</h1>
      <form onSubmit={handleSubmit}>
        <input name="type" placeholder="Tipo" value={formData.type} onChange={handleChange} required/>
        <input name="squareMeters" placeholder="Metros cuadrados" value={formData.squareMeters} onChange={handleChange} required/>
        <input
          type="number"
          name="pricePerNight"
          placeholder="Precio por noche"
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
        <input name="country" placeholder="País" value={formData.country} readOnly />
        <input name="province" placeholder="Provincia" value={formData.province} onChange={handleChange} required/>
        <input name="city" placeholder="Ciudad" value={formData.city} onChange={handleChange} required />
        <input name="street" placeholder="Calle" value={formData.street} onChange={handleChange} required/>
        <input
          type="number"
          name="maxTenants"
          placeholder="Máximo de inquilinos"
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
        <input name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required/>
        <input name="stateProperty" placeholder="Estado de la propiedad (número)" value={formData.stateProperty} onChange={handleChange} />
        <input name="bathroom" placeholder="Baños" value={formData.bathroom} onChange={handleChange}required />
        <input name="room" placeholder="Habitaciones" value={formData.room} onChange={handleChange} required />
        <input name="streammingPlatform" placeholder="Plataforma de streaming" value={formData.streammingPlatform} onChange={handleChange}  />
        <select name="pool" value={formData.pool} onChange={handleChange} required>
          <option value="" disabled>¿Tiene pileta?</option>
          <option value="Si">Sí</option>
          <option value="No">No</option>
        </select>

        <button type="submit">Subir propiedad</button>
      </form>
    </div>
  );
};

export default AddProperty;
