import { useState } from "react";
import "./SearchCity.css";

interface Props {
  onSearch: (city: string) => void;
}

export default function SearchCity({ onSearch }: Props) {
  const [city, setCity] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(city.trim());
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Digite uma cidade..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}