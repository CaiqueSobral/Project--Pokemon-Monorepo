export interface PokemonInterface {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprite: string;
  captureRate: number;
  evolutionChainId: number;
  types: Array<string>;
}
