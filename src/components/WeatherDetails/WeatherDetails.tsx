import type { Weather } from "../../types/Weather";

interface Props {
  weather: Weather;
}

export function WeatherDetails({ weather }: Props) {
  return (
    <div style={{ marginTop: 20, fontSize: 14 }}>
      <p>🌡️ Sensação térmica: {weather.apparent_temperature}°C</p>
      <p>💧 Umidade: {weather.relative_humidity_2m}%</p>
      <p>💨 Vento: {weather.wind_speed_10m} km/h</p>
    </div>
  );
}