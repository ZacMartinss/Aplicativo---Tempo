import "./Forecast.css";

type DailyForecast = {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
};

type Props = {
  daily: DailyForecast;
};

export function Forecast({ daily }: Props) {
  return (
    <div className="forecast">
      {daily.time.slice(0, 5).map((day, index) => (
        <div key={day} className="forecast-card">
          <p className="forecast-day">
            {new Date(day).toLocaleDateString("pt-BR", {
              weekday: "short",
            })}
          </p>

          <p className="forecast-max">
            ⬆ {daily.temperature_2m_max[index]}°
          </p>
          <p className="forecast-min">
            ⬇ {daily.temperature_2m_min[index]}°
          </p>
        </div>
      ))}
    </div>
  );
}