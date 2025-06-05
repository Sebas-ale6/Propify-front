import "../../styles/SearchFiltersStyle.css";
import { useState } from "react";

const SearchFilters = ({ onApplyFilters }) => {
  const [pool, setPool] = useState(false);
  const [rooms, setRooms] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const handleFilter = () => {
    onApplyFilters({ pool, rooms, priceMin, priceMax });
  };

  return (
    <div className="filters-container">
      <label>
        <input
          type="checkbox"
          checked={pool}
          onChange={(e) => setPool(e.target.checked)}
        />
        Pileta
      </label>

      <label>
        Habitaciones:
        <input
          type="number"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          min={1}
        />
      </label>

      <label>
        Precio mínimo:
        <input
          type="number"
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
        />
      </label>

      <label>
        Precio máximo:
        <input
          type="number"
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
        />
      </label>

      <button onClick={handleFilter}>Filtrar</button>
    </div>
  );
};

export default SearchFilters;
