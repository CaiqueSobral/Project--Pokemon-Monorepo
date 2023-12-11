import { weatherConditions } from './data/constants.ts';

const url = 'http://api.weatherapi.com/v1/current.json';

export async function getHabitatWeather(coords: { lat: number; lng: number }) {
  type weather = {
    location: {};
    current: {
      temp_c: number;
      is_day: boolean;
      condition: {
        code: number;
      };
    };
  };

  const data = await fetch(
    `${url}?${new URLSearchParams({
      key: `${process.env.WEATHER_API_KEY}`,
      q: `${coords.lat},${coords.lng}`,
    })}`
  );
  const response = (await data.json()) as weather;

  return {
    icon: setIcon(response.current.is_day, response.current.condition.code),
    tempC: response.current.temp_c,
  };
}

function setIcon(isDay: boolean, code: number): string {
  let key: keyof typeof weatherConditions;
  for (key in weatherConditions) {
    if (weatherConditions[key].codes.includes(code)) {
      if (weatherConditions[key].dayDiff) {
        return isDay
          ? weatherConditions[key].icon[0]
          : weatherConditions[key].icon[1];
      } else {
        return weatherConditions[key].icon[0];
      }
    }
  }
  return '';
}
