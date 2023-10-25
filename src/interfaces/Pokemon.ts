import { WeatherInterface } from './Weather';

export interface PokemonInterface {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprite: string;
  sprite3d: {
    uri: string;
    width: number;
    height: number;
  };
  captureRate: number;
  evolutionChainId: number;
  habitat: string;
  types: Array<string>;
}

export interface EvolutionChainInterface {
  id: number;
  species: [
    {
      id: number;
      name: string;
      sprite: string;
    },
  ];
}

export interface HabitatInterface {
  name: string;
  sprite: string;
  id: number;
  habitatWeather: WeatherInterface;
}
