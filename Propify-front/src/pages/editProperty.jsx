import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

  // Cargar los datos de la propiedad
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
    <div>
      <h1>Editar propiedad</h1>
      <form onSubmit={handleSubmit}>
        <input name="type" placeholder="Tipo" value={formData.type} onChange={handleChange} required />
        <input name="squareMeters" placeholder="Metros cuadrados" value={formData.squareMeters} onChange={handleChange} required />
        <input
          type="number"
          name="pricePerNight"
          placeholder="Precio por noche"
          value={formData.pricePerNight}
          onChange={handleChange}
          min="1000"
          max="300000"
          step="1000"
          required
        />
        <input name="country" placeholder="País" value={formData.country} readOnly />
        <input name="province" placeholder="Provincia" value={formData.province} onChange={handleChange} required />
        <input name="city" placeholder="Ciudad" value={formData.city} onChange={handleChange} required />
        <input name="street" placeholder="Calle" value={formData.street} onChange={handleChange} required />
        <input
          type="number"
          name="maxTenants"
          placeholder="Máximo de inquilinos"
          value={formData.maxTenants}
          onChange={handleChange}
          min="1"
          required
        />
        <input name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required />
        <input name="stateProperty" placeholder="Estado de la propiedad" value={formData.stateProperty} onChange={handleChange} />
        <input name="bathroom" placeholder="Baños" value={formData.bathroom} onChange={handleChange} required />
        <input name="room" placeholder="Habitaciones" value={formData.room} onChange={handleChange} required />
        <input name="streammingPlatform" placeholder="Plataforma de streaming" value={formData.streammingPlatform} onChange={handleChange} />
        <select name="pool" value={formData.pool} onChange={handleChange} required>
          <option value="" disabled>¿Tiene pileta?</option>
          <option value="Si">Sí</option>
          <option value="No">No</option>
        </select>

        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditProperty;


