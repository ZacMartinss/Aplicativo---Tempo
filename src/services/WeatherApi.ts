export async function getWeatherByCity(city: string) {
  // 1️⃣ Geocoding
  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=5&language=pt&format=json`
  );

  if (!geoResponse.ok) {
    throw new Error("Erro no geocoding");
  }

  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("Cidade não encontrada");
  }

  const result =
    geoData.results.find((r: any) => r.country_code === "BR") ||
    geoData.results[0];

  const { latitude, longitude } = result;

  // 2️⃣ Weather + Forecast (URL CORRETA)
  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`
  );

  if (!weatherResponse.ok) {
    throw new Error("Erro ao buscar clima");
  }

  const weatherData = await weatherResponse.json();

  return {
    current: {
      temperature_2m: weatherData.current_weather.temperature,
      apparent_temperature: weatherData.current_weather.temperature,
      relative_humidity_2m: 0,
      wind_speed_10m: weatherData.current_weather.windspeed,
    },
    daily: weatherData.daily,
  };
}