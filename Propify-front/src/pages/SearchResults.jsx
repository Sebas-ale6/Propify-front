import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const SearchResults = () => {
  const location = useLocation();
  const [filtered, setFiltered] = useState([]);

  // Parámetros de la URL
  const searchParams = new URLSearchParams(location.search);
  const destino = searchParams.get("destino")?.toLowerCase();
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const viajeros = parseInt(searchParams.get("viajeros"));

  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        const response = await fetch("http://localhost:5021/api/property");
        if (!response.ok) throw new Error("Error al obtener propiedades");
        const data = await response.json();

        // Filtro
        const results = data.filter((prop) => {
          const cityMatch = prop.city.toLowerCase().includes(destino);
          const enoughTenants = prop.maxTenants >= viajeros;
          return cityMatch && enoughTenants;
        });

        setFiltered(results);
      } catch (error) {
        console.error(error);
        setFiltered([]);
      }
    };

    fetchAndFilter();
  }, [destino, checkin, checkout, viajeros]);

  return (
    <div>
      <Header />
      <h2>Resultados de búsqueda</h2>
      <p>
        <strong>Destino:</strong> {destino} | <strong>Check-in:</strong> {checkin} |{" "}
        <strong>Check-out:</strong> {checkout} | <strong>Viajeros:</strong> {viajeros}
      </p>
      {filtered.length ? (
        <div className="property-list">
          {filtered.map((prop) => (
            <div key={prop.id}>
              <h3>{prop.type} - {prop.city}</h3>
              <p>{prop.description}</p>
              <p>Precio por noche: ${prop.pricePerNight}</p>
              <p>Capacidad: {prop.maxTenants} personas</p>
              <button>Reservar</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron propiedades disponibles.</p>
      )}
      <Footer />
    </div>
  );
};

export default SearchResults;

