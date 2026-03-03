interface DailyForecast {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

interface Props {
  daily: DailyForecast;
}

export default function Forecast({ daily }: Props) {
  return (
    <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-md">
      <h3 className="text-lg font-light mb-4 opacity-80">
        Próximos dias
      </h3>

      <div className="flex flex-col gap-3">
        {daily.time.slice(0, 5).map((day, index) => (
          <div
            key={day}
            className="flex justify-between items-center border-b border-white/10 pb-2"
          >
            <span className="text-sm">
              {new Date(day).toLocaleDateString("pt-BR", {
                weekday: "short",
              })}
            </span>

            <span className="text-sm opacity-80">
              ↑ {Math.round(daily.temperature_2m_max[index])}°
            </span>

            <span className="text-sm opacity-60">
              ↓ {Math.round(daily.temperature_2m_min[index])}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}