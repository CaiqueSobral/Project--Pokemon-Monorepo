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

export interface EvolutionChainInterface {
  id: number;
  species: [
    {
      id: number;
      name: string;
    },
  ];
}
