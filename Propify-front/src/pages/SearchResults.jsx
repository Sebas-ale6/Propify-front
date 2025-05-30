import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLanguage } from "../components/context/LanguageContext";
import Footer from "../components/footer/Footer";

const SearchResults = () => {
  const { t } = useLanguage(); // acceder a traducciones
  const properties = t("properties"); // propiedades según idioma
  const location = useLocation();
  const [filtered, setFiltered] = useState([]);

  // Obtenemos parámetros de la URL
  const searchParams = new URLSearchParams(location.search);
  const destino = searchParams.get("destino");
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const viajeros = searchParams.get("viajeros");

  useEffect(() => {
    const normalize = (str) =>
      str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    if (destino && Array.isArray(properties)) {
      const destinoNormalizado = normalize(destino);
      const filteredResults = properties.filter((prop) =>
        normalize(prop.location).includes(destinoNormalizado)
      );
      setFiltered(filteredResults);
    } else {
      setFiltered([]);
    }
  }, [destino, properties]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Resultados de búsqueda</h2>
      <p>
        <strong>Destino:</strong> {destino || "N/A"} | <strong>Check-in:</strong> {checkin || "N/A"} |{" "}
        <strong>Check-out:</strong> {checkout || "N/A"} | <strong>Viajeros:</strong> {viajeros || "N/A"}
      </p>

      {filtered.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filtered.map((prop, index) => (
            <li key={index} style={{ marginBottom: "2rem" }}>
              <h4>{prop.name}</h4>
              <p>{prop.location}</p>
              <p>{prop.description}</p>
              <img
                src={prop.img}
                alt={prop.name}
                width={300}
                style={{ borderRadius: "8px" }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron propiedades.</p>
      )}
      <Footer />
    </div>
  );
};

export default SearchResults;
