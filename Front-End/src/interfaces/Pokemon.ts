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
  types: Array<PokemonTypes>;
}

export interface PokemonTypes {
  type: string;
  color: string;
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
  id: number;
  name: string;
  color: string;
  sprite: {
    main: string;
    ground: string;
    bg: string;
  };
  coords: {
    lat: number;
    lng: number;
  };
  habitatWeather: {
    tempC: number;
    icon: string;
  };
}
