import { ImageProps } from 'react-native';

export interface PokemonData {
  name: number;
  url: string;
}

export interface PokemonInterface {
  id: number;
  name: string;
  sprite: string;
  types: Array<any>;
}
