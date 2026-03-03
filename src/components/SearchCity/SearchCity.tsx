import { useState } from "react";

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
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 w-full"
    >
      <input
        type="text"
        placeholder="Digite uma cidade..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-md"
      />

      <button
        type="submit"
        className="px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-md"
      >
        Buscar
      </button>
    </form>
  );
}