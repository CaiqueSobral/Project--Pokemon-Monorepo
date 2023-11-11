import { getWeatherData } from '../../util/httpWeather';
import { WeatherInterface } from '../../interfaces/Weather';
import React, { PropsWithChildren, createContext, useState } from 'react';

export const WeatherContext = createContext({
  currentWeather: {} as WeatherInterface,
  getWeather: async (coords: number[]) => {},
});

export default function WeatherContextProvider({
  children,
}: PropsWithChildren) {
  const [currentWeather, setCurrentWather] = useState<WeatherInterface>(
    {} as WeatherInterface,
  );

  const getWeather = async (coords: number[]) => {
    const currWeather = await getWeatherData(coords);
    setCurrentWather(currWeather);
  };

  return (
    <WeatherContext.Provider value={{ currentWeather, getWeather }}>
      {children}
    </WeatherContext.Provider>
  );
}
