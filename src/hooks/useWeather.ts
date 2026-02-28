import { useState } from "react";
import { getWeatherByCity } from "../services/WeatherApi";
import type { Weather } from "../types/Weather";
import type { ForecastDay } from "../types/Forecast";

export function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchCity(city: string) {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);
    setForecast([]);

    try {
      const data = await getWeatherByCity(city);

      setWeather({
        temperature_2m: data.current.temperature_2m,
        apparent_temperature: data.current.apparent_temperature,
        relative_humidity_2m: data.current.relative_humidity_2m,
        wind_speed_10m: data.current.wind_speed_10m,
      });

      const dailyForecast: ForecastDay[] = data.daily.time
        .slice(0, 5)
        .map((date: string, index: number) => ({
          date,
          tempMax: data.daily.temperature_2m_max[index],
          tempMin: data.daily.temperature_2m_min[index],
        }));

      setForecast(dailyForecast);
    } catch (err) {
      // 👇 ISSO É O MAIS IMPORTANTE AGORA
      console.error("ERRO REAL:", err);
      setError("Não foi possível buscar o clima 😕");
    } finally {
      setLoading(false);
    }
  }

  return {
    weather,
    forecast,
    loading,
    error,
    searchCity,
  };
}