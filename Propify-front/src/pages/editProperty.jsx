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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageNames, setImageNames] = useState([]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:5021/api/property/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || "No se pudo editar la propiedad"
          );
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

        setImageNames(data.imageNames || []);
        setLoading(false);
      } catch (error) {
        console.log(error);
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
      console.log(res);
      if (!res.ok && res.status < 500) throw new Error("No se pudo editar la propiedad");

      if (selectedFiles.length > 0) {
        for (const file of selectedFiles) {
          const formDataImage = new FormData();
          formDataImage.append("file", file);

          const imageRes = await fetch(
            "http://localhost:5021/api/image/upload-image",
            {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` },
              body: formDataImage,
            }
          );

          if (!imageRes.ok) {
            console.error("Error al subir imagen");
            continue;
          }

          const imageData = await imageRes.json();

          await fetch("http://localhost:5021/api/image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: imageData.name,
              createdDate: new Date().toISOString(),
              uuidProperty: Number(id),
            }),
          });
        }
      }

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

      <div className="imagen-galeria">
        {imageNames.map((name, idx) => (
          <img
            key={idx}
            src={`http://localhost:5021/api/image/${name}`}
            alt={`Imagen ${idx + 1}`}
            className="imagen-miniatura"
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="formulario">
        {[
          ["type", "Tipo"],
          ["squareMeters", "Metros cuadrados"],
          ["pricePerNight", "Precio por noche", "number"],
          ["country", "País", "text", true],
          ["street", "Calle"],
          ["maxTenants", "Máximo de inquilinos", "number"],
          ["description", "Descripción", "text", false, "descripcion"],
          ["stateProperty", "Estado de la propiedad"],
          ["bathroom", "Baños"],
          ["room", "Habitaciones"],
          ["streammingPlatform", "Plataforma de streaming"],
        ].map(
          ([name, label, type = "text", readOnly = false, className = ""]) => (
            <div className={`form-group ${className}`} key={name}>
              <label>{label}</label>
              <input
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                readOnly={readOnly}
                required={!readOnly}
              />
            </div>
          )
        )}
        <div className="form-group">
          <label>Provincia</label>
          <select
            id="province"
            value={formData.province}
            onChange={handleChange}
            name="province"
            required
          >
            <option value="" disabled hidden>
              Seleccioná una provincia
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
          <label>¿Tiene pileta?</label>
          <select
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

        <div className="form-group" style={{ gridColumn: "span 2" }}>
          <label>Subir nuevas imágenes</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setSelectedFiles([...e.target.files])}
          />
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
