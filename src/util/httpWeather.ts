import { WEATHER_API_KEY } from '@env';
import axios from 'axios';

const url = 'http://api.weatherapi.com/v1/current.json';

export async function getWeatherData() {
  const { data } = await axios.get(url, {
    params: {
      key: WEATHER_API_KEY,
      q: 'London',
    },
  });

  console.log(data);
}
