import type { Weather } from "../types/Weather";

export type WeatherType = "sun" | "rain" | "snow";

export function getWeatherType(weather: Weather): WeatherType {
  if (weather.temperature_2m >= 25) return "sun";
  if (weather.temperature_2m >= 15) return "rain";
  return "snow";
}