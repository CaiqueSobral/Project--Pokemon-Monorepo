import { ImageProps } from 'react-native';
import { PokemonInterface } from '../interfaces/Pokemon';

export class Pokemon implements PokemonInterface {
  id: number;
  name: string;
  sprite: string;
  types: Array<any>;

  constructor(id: number, name: string, sprite: string, types: Array<any>) {
    this.id = id;
    this.name = name;
    this.sprite = sprite;
    this.types = types;
  }
}
