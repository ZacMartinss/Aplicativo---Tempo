import { useState } from "react";
import "./SearchCity.css";

interface SearchCityProps {
  onSearch: (city: string) => void;
}

function SearchCity({ onSearch }: SearchCityProps) {
  const [city, setCity] = useState("");

  function handleClick() {
    if (!city.trim()) return;
    onSearch(city);
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Digite a cidade (ex: Peruíbe SP)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleClick}>Buscar</button>
    </div>
  );
}

export default SearchCity;
