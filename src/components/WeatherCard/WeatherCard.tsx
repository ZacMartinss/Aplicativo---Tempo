import "./WeatherCard.css";

interface WeatherCardProps {
  city: string;
  temperature: number;
}

function WeatherCard({ city, temperature }: WeatherCardProps) {
  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <p className="temperature">{temperature}°C</p>
    </div>
  );
}

export default WeatherCard;
