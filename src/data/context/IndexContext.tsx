import { PropsWithChildren } from 'react';
import PokemonsContextProvider from './pokemonsContext';
import WeatherContextProvider from './weatherContext';

export default function IndexContextProvider({ children }: PropsWithChildren) {
  return (
    <PokemonsContextProvider>
      <WeatherContextProvider>{children}</WeatherContextProvider>
    </PokemonsContextProvider>
  );
}
