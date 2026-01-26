import { useState } from "react";
import { getWeatherByCity } from "./services/WeatherApi";
import { getWeatherBackgroundByTemp } from "./utils/getWeatherBackground";

function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!city) return;

    setLoading(true);
    setError("");
    setTemperature(null);

    try {
      const weather = await getWeatherByCity(city);
      setTemperature(weather.temperature);
    } catch {
      setError("Não foi possível buscar o clima 😕");
    } finally {
      setLoading(false);
    }
  }

  const backgroundImage =
    temperature !== null ? getWeatherBackgroundByTemp(temperature) : "";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <div style={{
        background: "rgba(0,0,0,0.55)",
        padding: 30,
        borderRadius: 12,
        color: "#fff",
        textAlign: "center",
        width: 320
      }}>
        <h1>🌤️ App de Clima</h1>

        <input
          type="text"
          placeholder="Digite a cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 15, borderRadius: 8, border: "none" }}
        />

        <button onClick={handleSearch} style={{ width: "100%", padding: 10, marginTop: 15, borderRadius: 8, border: "none", backgroundColor: "#3b82f6", color: "#fff", cursor: "pointer" }}>
          Buscar
        </button>

        {loading && <p>Carregando...</p>}

        {temperature !== null && <p style={{ marginTop: 20, fontSize: 18 }}>Temperatura: {temperature}°C</p>}

        {error && <p style={{ marginTop: 15, color: "#f87171" }}>{error}</p>}
      </div>
    </div>
  );
}

export default App;