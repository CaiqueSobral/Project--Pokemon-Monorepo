import {
  EvolutionChainInterface,
  HabitatInterface,
  PokemonInterface,
} from '../../interfaces/Pokemon';
import { getAllPokemons } from '../../util/httpPokemons';
import { PropsWithChildren, createContext, useState } from 'react';

export const PokemonsContext = createContext({
  pokemons: [] as Array<PokemonInterface>,
  evolutionChain: [] as Array<EvolutionChainInterface>,
  habitats: [] as Array<HabitatInterface>,
  getData: async () => {},
});

export default function PokemonsContextProvider({
  children,
}: PropsWithChildren) {
  const [pokemons, setPokemons] = useState<Array<PokemonInterface>>([]);
  const [evolutionChain, setEvolutionChain] = useState<
    Array<EvolutionChainInterface>
  >([]);
  const [habitats, setHabitats] = useState<Array<HabitatInterface>>([]);

  const getData = async () => {
    const pokeTemp = await getAllPokemons();
    setPokemons(pokeTemp.pokemons);
    setEvolutionChain(pokeTemp.evolutions);
    setHabitats(pokeTemp.habitats);
  };

  return (
    <PokemonsContext.Provider
      value={{ pokemons, evolutionChain, habitats, getData }}
    >
      {children}
    </PokemonsContext.Provider>
  );
}
