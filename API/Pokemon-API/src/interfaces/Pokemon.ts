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
  types: Array<{ color: string; type: string }>;
}
