import { weatherIcons } from '../data/constants';
import { WeatherInterface } from '../interfaces/Weather';
import axios from 'axios';

const url = 'http://api.weatherapi.com/v1/current.json';

const weatherConditions = {
  clear: {
    codes: [1000],
    dayDiff: true,
    icon: [weatherIcons.clear_Day, weatherIcons.clear_Night],
  },
  cloudy: {
    codes: [1006, 1003],
    dayDiff: true,
    icon: [weatherIcons.cloudy_Day, weatherIcons.cloudy_Night],
  },
  overcast: {
    codes: [1009, 1030, 1063, 1066, 1069, 1072],
    dayDiff: true,
    icon: [weatherIcons.overcast_Day, weatherIcons.overcast_Night],
  },
  blizzard: {
    codes: [1117, 1222, 1225, 1237, 1258, 1264, 1282, 1279],
    dayDiff: false,
    icon: [weatherIcons.blizzard],
  },
  fog: {
    codes: [1135, 1147],
    dayDiff: false,
    icon: [weatherIcons.fog],
  },
  lightRain: {
    codes: [1183, 1180, 1186, 1189, 1198, 1240, 1150, 1153, 1168, 1171],
    dayDiff: false,
    icon: [weatherIcons.light_rain],
  },
  heavyRain: {
    codes: [1195, 1192, 1273, 1276, 1087, 1087],
    dayDiff: false,
    icon: [weatherIcons.heavy_rain],
  },
  lightSleet: {
    codes: [1204, 1207, 1249, 1252],
    dayDiff: false,
    icon: [weatherIcons.light_sleet],
  },
  lightSnow: {
    codes: [1114, 1213, 1210, 1216, 1219, 1255, 1261],
    dayDiff: false,
    icon: [weatherIcons.light_snow],
  },
  torrentialRain: {
    codes: [1246, 1243, 1201],
    dayDiff: false,
    icon: [weatherIcons.torrential_rain],
  },
};

export async function getWeatherData(coords: Array<number>) {
  const { data } = await axios
    .get(url, {
      params: {
        key: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
        q: `${coords[0]},${coords[1]}`,
      },
    })
    .catch((e) => {
      throw new Error(e);
    });

  const weather: WeatherInterface = {
    location: {
      name: data.location.name,
      country: data.location.country,
    },
    weather: {
      tempC: '' + Math.floor(data.current.temp_c),
      tempF: '' + Math.floor(data.current.temp_f),
      isDay: data.current.is_day === 1,
      condition: {
        icon: setIcon(data.current.is_day === 1, data.current.condition.code),
        code: data.current.condition.code,
      },
    },
  };

  return weather;
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
