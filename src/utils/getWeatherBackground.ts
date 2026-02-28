import sunny from "../assets/backgrounds/sunny.jpg";
import cloudy from "../assets/backgrounds/cloudy.jpg";
import rainy from "../assets/backgrounds/rainy.jpg";
import snow from "../assets/backgrounds/snow.jpg";

export function getWeatherBackgroundByTemp(temp: number) {
  if (temp >= 26) return sunny;
  if (temp >= 20) return cloudy;
  if (temp >= 10) return rainy;
  return snow;
}