export const weatherIcons = {
  clear_Day: 'https://media.giphy.com/media/AYRiU3MwDFU1daE6Ba/giphy.gif',
  clear_Night: 'https://media.giphy.com/media/Y5bd8MvfXF3Qiz7X2u/giphy.gif',
  cloudy_Day: 'https://media.giphy.com/media/CLy96N2DeIZJemEb2W/giphy.gif',
  cloudy_Night: 'https://media.giphy.com/media/556IvQ2jke7m6T5CQZ/giphy.gif',
  overcast_Day: 'https://media.giphy.com/media/QDi3MO9uJFwJ8qOrlY/giphy.gif',
  overcast_Night: 'https://media.giphy.com/media/7bz27NStypZmyi7uXe/giphy.gif',
  blizzard: 'https://media.giphy.com/media/qOTZVmVtrpUhrNrYcd/giphy.gif',
  fog: 'https://media.giphy.com/media/DUhkaCnJhzNnz8zd8Y/giphy.gif',
  light_rain: 'https://media.giphy.com/media/hKiBrwknSaUWAUuV7a/giphy.gif',
  heavy_rain: 'https://media.giphy.com/media/eV0yl7CwwLz57rt675/giphy.gif',
  light_sleet: 'https://media.giphy.com/media/K6wGswO0R4XK7I2Y1K/giphy.gif',
  light_snow: 'https://media.giphy.com/media/Q77zarHqN5ylVsH4OH/giphy.gif',
  torrential_rain: 'https://media.giphy.com/media/gjHPrvAHw7USQKtVyy/giphy.gif',
};

export const weatherConditions = {
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
