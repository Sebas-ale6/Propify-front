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
    country: "",
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
        <input name="type" placeholder="Tipo" value={formData.type} onChange={handleChange} />
        <input name="squareMeters" placeholder="Metros cuadrados" value={formData.squareMeters} onChange={handleChange} />
        <input name="pricePerNight" placeholder="Precio por noche" value={formData.pricePerNight} onChange={handleChange} />
        <input name="country" placeholder="País" value={formData.country} onChange={handleChange} />
        <input name="province" placeholder="Provincia" value={formData.province} onChange={handleChange} />
        <input name="city" placeholder="Ciudad" value={formData.city} onChange={handleChange} />
        <input name="street" placeholder="Calle" value={formData.street} onChange={handleChange} />
        <input name="maxTenants" placeholder="Máximo de inquilinos" value={formData.maxTenants} onChange={handleChange} />
        <input name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} />
        <input name="stateProperty" placeholder="Estado de la propiedad (número)" value={formData.stateProperty} onChange={handleChange} />
        <input name="bathroom" placeholder="Baños" value={formData.bathroom} onChange={handleChange} />
        <input name="room" placeholder="Habitaciones" value={formData.room} onChange={handleChange} />
        <input name="streammingPlatform" placeholder="Plataforma de streaming" value={formData.streammingPlatform} onChange={handleChange} />
        <input name="pool" placeholder="Pileta (Sí/No)" value={formData.pool} onChange={handleChange} />

        <button type="submit">Subir propiedad</button>
      </form>
    </div>
  );
};

export default AddProperty;
