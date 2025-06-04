import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SearchFilters from "../components/filter/SearchFilters";
import "../styles/SearchResultsStyle.css";

const normalize = (str) =>
  str?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

const SearchResults = () => {
  const location = useLocation();
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    pool: false,
    rooms: "",
    priceMin: "",
    priceMax: ""
  });

  const searchParams = new URLSearchParams(location.search);
  const destino = normalize(searchParams.get("destino"));
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const viajeros = parseInt(searchParams.get("viajeros"));

  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        const response = await fetch("http://localhost:5021/api/property");
        if (!response.ok) throw new Error("Error al obtener propiedades");
        const data = await response.json();

        const results = data.filter((prop) => {
          const cityMatch = normalize(prop.city).includes(destino) || normalize(prop.province).includes(destino);
          const enoughTenants = prop.maxTenants >= viajeros;

          // Filtros adicionales
          const hasPool = !filters.pool || normalize(prop.pool) === "si";
          const matchesRooms = !filters.rooms || parseInt(prop.room) >= parseInt(filters.rooms);
          const matchesPriceMin = !filters.priceMin || prop.pricePerNight >= parseInt(filters.priceMin);
          const matchesPriceMax = !filters.priceMax || prop.pricePerNight <= parseInt(filters.priceMax);

          return (
            (cityMatch && enoughTenants && hasPool && matchesRooms && matchesPriceMin && matchesPriceMax)
          );
        });

        setFiltered(results);
      } catch (error) {
        console.error(error);
        setFiltered([]);
      }
    };

    fetchAndFilter();
  }, [destino, checkin, checkout, viajeros, filters]);

return (
  <div className="search-results-page">
    <Header />

    <main className="search-results-content">
      <div className="results-summary">
        <h2>Resultados de búsqueda</h2>
        <p>
          <strong>Destino:</strong> {destino} | <strong>Check-in:</strong> {checkin} |{" "}
          <strong>Check-out:</strong> {checkout} | <strong>Viajeros:</strong> {viajeros}
        </p>
      </div>

      <SearchFilters onApplyFilters={setFilters} />

      {filtered.length ? (
        <div className="property-list">
          {filtered.map((prop) => (
            <div key={prop.id} className="property-card">
              <h3>{prop.type} - {prop.city}</h3>
              <p>{prop.description}</p>
              <p>Precio por noche: ${prop.pricePerNight}</p>
              <p>Capacidad: {prop.maxTenants} personas</p>
              <button className="reserve-button">Reservar</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No se encontraron propiedades disponibles.</p>
      )}
    </main>

    <Footer />
  </div>
);}

export default SearchResults;
