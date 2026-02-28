import { useState } from "react";
import "./App.css";

import { getWeatherByCity } from "./services/WeatherApi";
import type { Weather } from "./types/Weather";

import { AnimatedBackground } from "./components/AnimatedBackground/AnimatedBackground";
import SearchCity from "./components/SearchCity/SearchCity";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import { Forecast } from "./components/Forecast/Forecast";

import { getWeatherBackgroundByTemp } from "./utils/getWeatherBackground";
import { getWeatherType } from "./utils/getWeatherType";

/* 🔒 Tipo local para UI (não mexe no Weather.ts) */
interface WeatherUI extends Weather {
  city: string;
  daily?: any;
}

function App() {
  const [weather, setWeather] = useState<WeatherUI | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(city: string) {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const data = await getWeatherByCity(city);

      const mappedWeather: WeatherUI = {
        city,
        temperature_2m: data.current.temperature_2m,
        apparent_temperature: data.current.apparent_temperature,
        relative_humidity_2m: data.current.relative_humidity_2m,
        wind_speed_10m: data.current.wind_speed_10m,
        daily: data.daily,
      };

      setWeather(mappedWeather);
    } catch {
      setError("Não foi possível buscar o clima 😕");
    } finally {
      setLoading(false);
    }
  }

  const backgroundImage = weather
    ? getWeatherBackgroundByTemp(weather.temperature_2m)
    : "";

  const weatherType = weather ? getWeatherType(weather) : null;

  return (
    <div
      className="app"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
      }}
    >
      {weatherType && <AnimatedBackground type={weatherType} />}

      <div className="content">
        {/* HEADER */}
        <h1 className="title">Tempfy</h1>
        <p className="subtitle">Clima em tempo real, simples e bonito ☁️</p>

        {/* BUSCA */}
        <SearchCity onSearch={handleSearch} />

        {loading && <p className="status">Carregando...</p>}
        {error && <p className="error">{error}</p>}

        {/* CIDADE + TEMPERATURA */}
        {weather && (
          <div className="location-highlight">
            <h2 className="city-name">{weather.city}</h2>
            <div className="main-temp">
              {Math.round(weather.temperature_2m)}°C
            </div>
          </div>
        )}

        {/* CARDS */}
        {weather && <WeatherCard weather={weather} />}

        {/* PREVISÃO */}
        {weather?.daily && <Forecast daily={weather.daily} />}
      </div>
    </div>
  );
}

export default App;