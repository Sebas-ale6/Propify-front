import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SearchFilters from "../components/filter/SearchFilters";
import "../styles/SearchResultsStyle.css";

const normalize = (str) =>
  str?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    pool: false,
    rooms: "",
    priceMax: 300000,
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
          const cityMatch =
            normalize(prop.city).includes(destino) ||
            normalize(prop.province).includes(destino);

          const enoughTenants = prop.maxTenants >= viajeros;

          const poolValue = normalize(prop.pool);
          const hasPool = !filters.pool || poolValue === "si";

          const roomValue = parseInt(prop.room);
          const matchesRooms =
            !filters.rooms || (!isNaN(roomValue) && roomValue >= parseInt(filters.rooms));

          const price = parseInt(prop.pricePerNight);
          const priceMax = parseInt(filters.priceMax);
          const matchesPriceMax = isNaN(priceMax) || (!isNaN(price) && price <= priceMax);

          return (
            cityMatch &&
            enoughTenants &&
            hasPool &&
            matchesRooms &&
            matchesPriceMax
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
          <h2>Resultados de tu búsqueda</h2>
          <p>
            <strong>Destino:</strong> {destino} |{" "}
            <strong>Check-in:</strong> {checkin} |{" "}
            <strong>Check-out:</strong> {checkout} |{" "}
            <strong>Viajeros:</strong> {viajeros}
          </p>
        </div>

        <SearchFilters onApplyFilters={setFilters} />

        {filtered.length ? (
          <div className="property-list">
            {filtered.map((prop) => (
              <div key={prop.id} className="property-card">
                <img
                  src="/images/placeholder.png"
                  alt={`Imagen de ${prop.type}`}
                  className="property-image-side"
                />
                <div className="property-info">
                <h3>{prop.type}</h3>
                <p className="property-location">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="location-icon"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="currentColor"
                      d="M168 0C75.1 0 0 75.1 0 168c0 87.3 126.2 229.3 160.4 265.1a24 24 0 0 0 35.2 0C213.8 397.3 340 255.3 340 168 340 75.1 264.9 0 168 0zm0 224a56 56 0 1 1 0-112 56 56 0 0 1 0 112z"
                    />
                  </svg>
                  {prop.city}
                </p>
                <p>
                  Precio por noche: <span className="precio-valor">${prop.pricePerNight}</span>
                </p>
                <p> Capacidad: {prop.maxTenants} personas</p>
                <button
                  className="reserve-button"
                  onClick={() => navigate(`/property/${prop.id}`)}
                >
                  Ver más
                </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-results">
            No se encontraron propiedades disponibles.
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;
