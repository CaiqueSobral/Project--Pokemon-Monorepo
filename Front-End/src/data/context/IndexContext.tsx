import { PropsWithChildren } from 'react';
import PokemonsContextProvider from './pokemonsContext';
import WeatherContextProvider from './weatherContext';
import UserContextProvider, { UserContext } from './userContext';

export default function IndexContextProvider({ children }: PropsWithChildren) {
  return (
    <PokemonsContextProvider>
      <UserContextProvider>
        <WeatherContextProvider>{children}</WeatherContextProvider>
      </UserContextProvider>
    </PokemonsContextProvider>
  );
}
