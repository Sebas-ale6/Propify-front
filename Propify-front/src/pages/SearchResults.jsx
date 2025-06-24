import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SearchFilters from "../components/filter/SearchFilters";
import "../styles/SearchResultsStyle.css";

const normalize = (str) =>
  str
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

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
  const province = searchParams.get("province");
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const guests = parseInt(searchParams.get("guests"));

  useEffect(() => {
    const fetchAvailableProperties = async () => {
      try {
        const url = `http://localhost:5021/api/property/available?province=${encodeURIComponent(
          province
        )}&checkin=${checkin}&checkout=${checkout}&guests=${guests}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error al obtener propiedades");

        const data = await response.json();

        console.log(data)

        const results = data.filter((prop) => {
          const poolValue = normalize(prop.pool);
          const hasPool = !filters.pool || poolValue === "si";

          const roomValue = parseInt(prop.room);
          const matchesRooms =
            !filters.rooms ||
            (!isNaN(roomValue) && roomValue >= parseInt(filters.rooms));

          const price = parseInt(prop.pricePerNight);
          const priceMax = parseInt(filters.priceMax);
          const matchesPriceMax =
            isNaN(priceMax) || (!isNaN(price) && price <= priceMax);

          return hasPool && matchesRooms && matchesPriceMax;
        });

        setFiltered(results);
      } catch (error) {
        console.error(error);
        setFiltered([]);
      }
    };

    fetchAvailableProperties();
  }, [province, checkin, checkout, guests, filters]);

  return (
    <div className="search-results-page">
      <Header />

      <main className="search-results-content">
        <div className="results-summary">
          <h2>Resultados de búsqueda</h2>
          <p>
            <strong>Destino:</strong> {province} | <strong>Check-in:</strong>{" "}
            {checkin} | <strong>Check-out:</strong> {checkout} |{" "}
            <strong>Viajeros:</strong> {guests}
          </p>
        </div>

        <SearchFilters onApplyFilters={setFilters} />

        {filtered.length ? (
          <div className="property-list">
            {filtered.map((prop) => (
              <div key={prop.id} className="property-card">
                <h3>
                  {prop.type} - {prop.city}
                </h3>
                <p>{prop.description}</p>
                <p>Precio por noche: ${prop.pricePerNight}</p>
                <p>Capacidad: {prop.maxTenants} personas</p>
                <button
                  className="reserve-button"
                  onClick={() =>
                    navigate("/payment", {
                      state: {
                        property: prop,
                        checkin,
                        checkout,
                        travelers: guests,
                      },
                    })
                  }
                >
                  Reservar
                </button>
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
