export interface WeatherInterface {
  location: {
    name: string;
    country: string;
  };
  weather: {
    tempC: string;
    tempF: string;
    isDay: boolean;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
}
