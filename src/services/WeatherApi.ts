export async function getWeatherByCity(city: string) {
  // 1️⃣ Geocoding
  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=pt&format=json`
  );
  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("Cidade não encontrada");
  }

  const { latitude, longitude } = geoData.results[0];

  // 2️⃣ Weather
  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  const weatherData = await weatherResponse.json();

  return weatherData.current_weather;
}
