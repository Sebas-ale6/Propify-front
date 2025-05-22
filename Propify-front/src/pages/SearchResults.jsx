import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { properties } from "../data/PropertyData";


const SearchResults = () => {
  const location = useLocation();
  const [filtered, setFiltered] = useState([]);

  // Convertimos la query string a objeto
  const searchParams = new URLSearchParams(location.search);
  const destino = searchParams.get("destino");
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const viajeros = searchParams.get("viajeros");

  useEffect(() => {
    // Filtro básico por destino (podés sumar más lógica después)
    const filteredResults = properties.filter((prop) =>
      prop.location.toLowerCase().includes(destino?.toLowerCase())
    );
    setFiltered(filteredResults);
  }, [destino]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Resultados de búsqueda</h2>
      <p>
        <strong>Destino:</strong> {destino} | <strong>Check-in:</strong> {checkin} |{" "}
        <strong>Check-out:</strong> {checkout} | <strong>Viajeros:</strong> {viajeros}
      </p>

      {filtered.length > 0 ? (
        <ul>
          {filtered.map((prop, index) => (
            <li key={index}>
              <h4>{prop.name}</h4>
              <p>{prop.location}</p>
              <img src={prop.img} alt={prop.name} width={200} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron propiedades.</p>
      )}
    </div>
  );
};

export default SearchResults;
