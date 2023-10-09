import { WeatherInterface } from '@/interfaces/Weather';
import { WEATHER_API_KEY } from '@env';
import axios from 'axios';

const url = 'http://api.weatherapi.com/v1/current.json';

export async function getWeatherData(coords: Array<number>) {
  const { data } = await axios.get(url, {
    params: {
      key: WEATHER_API_KEY,
      q: `${coords[0]},${coords[1]}`,
    },
  });

  console.log(data);

  const weather: WeatherInterface = {
    location: {
      name: data.location.name,
      country: data.location.country,
    },
    weather: {
      tempC: Math.floor(data.current.temp_c) + ' °C',
      tempF: Math.floor(data.current.temp_f) + ' °F',
      isDay: data.current.is_day === 1,
      condition: {
        text: data.current.condition.text,
        icon: data.current.condition.icon,
        code: data.current.condition.code,
      },
    },
  };

  return weather;
}
