import "../../styles/SearchFiltersStyle.css";
import { useState } from "react";

const SearchFilters = ({ onApplyFilters }) => {
  const [pool, setPool] = useState(false);
  const [rooms, setRooms] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const handleFilter = () => {
    onApplyFilters({
      pool,
      rooms: parseInt(rooms) || "",
      priceMax: parseInt(priceMax) || ""
    });
  };

  return (
    <div className="filters-container">
      <div className="filter-item">
        <label>
        <input
          type="checkbox"
          checked={pool}
          onChange={(e) => setPool(e.target.checked)}
          id="pool-checkbox"
        />
        Pileta</label>
      </div>

      <div className="filter-item">
        <label>Habitaciones</label>
        <input
          type="number"
          id="rooms"
          min="1"
          max="10"
          value={rooms}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (isNaN(val) || val < 1) {
              setRooms("");
            } else if (val > 10) {
              setRooms(10);
            } else {
              setRooms(val);
            }
          }}
        />
        
      </div>

      <div className="filter-item">
        <label htmlFor="priceMax">Precio máximo</label>
        <input
          type="number"
          id="priceMax"
          min="1000"
          max="300000"
          step="10000"
          value={priceMax}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (isNaN(val) || val < 0) {
              setPriceMax("");
            } else if (val > 300000) {
              setPriceMax(300000);
            } else {
              setPriceMax(val);
            }
          }}
        />
      </div>

      <button onClick={handleFilter}>Filtrar</button>
    </div>
  );
};

export default SearchFilters;
