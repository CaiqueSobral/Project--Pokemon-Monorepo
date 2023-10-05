import { ImageProps } from 'react-native';

export interface PokemonData {
  name: number;
  url: string;
}

export interface PokemonInterface {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprite: string;
  captureRate: number;
  evolutionChainId: number;
  types: Array<PokemonTypes>;
}

interface PokemonTypes {
  name: string;
}
