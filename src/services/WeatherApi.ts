import type { Weather } from "../types/Weather";

interface WeatherResponse {
  current: Weather;
  daily: any;
}

export async function getWeatherByCity(
  city: string
): Promise<WeatherResponse> {

  // 1️⃣ Busca latitude e longitude
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
  );

  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("Cidade não encontrada");
  }

  const { latitude, longitude } = geoData.results[0];

  // 2️⃣ Busca clima
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
  );

  const weatherData = await weatherRes.json();

  return weatherData;
}