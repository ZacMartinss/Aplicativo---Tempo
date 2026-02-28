import type { Weather } from "../../types/Weather";
import "./WeatherCard.css";

type Props = {
  weather: Weather;
};

export default function WeatherCard({ weather }: Props) {
  return (
    <div className="weather-cards">
      <div className="card">
        🌡️
        <span>Temperatura</span>
        <strong>{weather.temperature_2m}°C</strong>
      </div>

      <div className="card">
        😎
        <span>Sensação</span>
        <strong>{weather.apparent_temperature}°C</strong>
      </div>

      <div className="card">
        💧
        <span>Umidade</span>
        <strong>{weather.relative_humidity_2m}%</strong>
      </div>

      <div className="card">
        💨
        <span>Vento</span>
        <strong>{weather.wind_speed_10m} km/h</strong>
      </div>
    </div>
  );
}