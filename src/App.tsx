import { useState } from "react";
import { getWeatherByCity } from "./services/WeatherApi";
import type { Weather } from "./types/Weather";

import SearchCity from "./components/SearchCity/SearchCity";
import Forecast from "./components/Forecast/Forecast";
import WeatherAnimation from "./components/AnimatedBackground/WeatherAnimation";

import { ArrowLeft, Search, Github, Linkedin } from "lucide-react";

interface WeatherUI extends Weather {
  city: string;
  daily?: any;
}

export default function App() {
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

      const mapped: WeatherUI = {
        ...data.current,
        city,
        daily: data.daily,
      };

      setWeather(mapped);
    } catch {
      setError("Cidade não encontrada.");
    } finally {
      setLoading(false);
    }
  }

  function resetSearch() {
    setWeather(null);
    setError("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-fuchsia-600 to-blue-500 text-white flex flex-col">

      {/* ======================= HOME ======================= */}
      {!weather && !loading && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 space-y-10">

          {/* Logo + Sol */}
          <div className="text-center space-y-4">
            <div className="w-28 mx-auto">
              <WeatherAnimation weatherCode={0} />
            </div>

            <h1 className="text-4xl font-light tracking-wide">
              Weather App
            </h1>

            <p className="opacity-70 text-sm">
              Consulte o clima de qualquer cidade
            </p>
          </div>

          {/* Barra de busca controlada */}
          <div className="w-full max-w-lg">
            <SearchCity onSearch={handleSearch} />
          </div>

          {/* Erro */}
          {error && (
            <p className="text-red-200 bg-red-500/20 px-6 py-2 rounded-xl text-sm">
              {error}
            </p>
          )}

          {/* Redes em Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-8 py-6 flex flex-col items-center gap-4 shadow-lg">
            <p className="text-sm opacity-80">
              Desenvolvido por Isaac Martins
            </p>

            <div className="flex gap-6">
              <a
                href="https://github.com/seuusuario"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition"
              >
                <Github size={22} />
              </a>

              <a
                href="https://linkedin.com/in/seuusuario"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition"
              >
                <Linkedin size={22} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ======================= LOADING ======================= */}
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lg animate-pulse opacity-80">
            Buscando clima...
          </p>
        </div>
      )}

      {/* ======================= RESULTADO ======================= */}
      {weather && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 space-y-10">

          {/* Header Card */}
          <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-3 flex justify-between items-center shadow-lg">
            <button
              onClick={resetSearch}
              className="flex items-center gap-2 text-sm hover:opacity-80 transition"
            >
              <ArrowLeft size={18} />
              Voltar
            </button>

            <button
              onClick={resetSearch}
              className="flex items-center gap-2 text-sm hover:opacity-80 transition"
            >
              <Search size={18} />
              Buscar outra cidade
            </button>
          </div>

          {/* Card Principal */}
          <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl p-10 text-center shadow-2xl space-y-6">

            <WeatherAnimation
              weatherCode={weather.weather_code}
              temperature={weather.temperature_2m}
            />

            <h2 className="text-3xl font-light tracking-wide opacity-90">
              {weather.city}
            </h2>

            <div className="text-[110px] font-extralight leading-none drop-shadow-2xl">
              {Math.round(weather.temperature_2m)}°
            </div>

            <p className="text-lg opacity-80">
              Sensação {Math.round(weather.apparent_temperature)}°
            </p>

            <div className="flex justify-center gap-10 text-sm opacity-70">
              <span>Umidade {weather.relative_humidity_2m}%</span>
              <span>Vento {weather.wind_speed_10m} km/h</span>
            </div>
          </div>

          {/* Próximos dias */}
          {weather.daily && (
            <div className="w-full max-w-md">
              <Forecast daily={weather.daily} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}