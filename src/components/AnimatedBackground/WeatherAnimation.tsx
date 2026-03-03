import Lottie from "lottie-react";
import sun from "../../assets/animations/sun.json.json";
import rain from "../../assets/animations/rain.json.json";
import snow from "../../assets/animations/snow.json.json";
import storm from "../../assets/animations/storm.json.json";

interface Props {
  weatherCode: number;
  temperature?: number;
}

export default function WeatherAnimation({
  weatherCode,
  temperature,
}: Props) {
  let animationData: any = sun;

  // ❄️ Forçar neve se muito frio
  if (temperature !== undefined && temperature <= 2) {
    animationData = snow;
  }

  // ⛈ Tempestade
  else if (weatherCode >= 95) {
    animationData = storm;
  }

  // 🌧 Chuva
  else if (
    (weatherCode >= 51 && weatherCode <= 67) ||
    (weatherCode >= 80 && weatherCode <= 82)
  ) {
    animationData = rain;
  }

  // ❄️ Neve oficial da API
  else if (weatherCode >= 71 && weatherCode <= 77) {
    animationData = snow;
  }

  // 🌤 Céu limpo / parcialmente limpo
  else {
    animationData = sun;
  }

  return (
    <div className="w-64 mx-auto">
      <Lottie animationData={animationData} loop />
    </div>
  );
}