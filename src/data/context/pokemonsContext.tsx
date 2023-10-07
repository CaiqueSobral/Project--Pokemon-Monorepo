import {
  EvolutionChainInterface,
  PokemonInterface,
} from '../../interfaces/Pokemon';
import { getAllPokemons } from '../../util/httpPokemons';
import { PropsWithChildren, createContext, useState } from 'react';

export const PokemonsContext = createContext({
  pokemons: [] as Array<PokemonInterface>,
  evolutionChain: [] as Array<EvolutionChainInterface>,
  getData: async () => {},
});

export default function PokemonsContextProvider({
  children,
}: PropsWithChildren) {
  const [pokemons, setPokemons] = useState<Array<PokemonInterface>>([]);
  const [evolutionChain, setEvolutionChain] = useState<
    Array<EvolutionChainInterface>
  >([]);

  const getData = async () => {
    if (pokemons.length === 0 || evolutionChain.length === 0) {
      const pokeTemp = await getAllPokemons();
      setPokemons(pokeTemp.pokemons);
      setEvolutionChain(pokeTemp.evolutions);
    }
  };

  return (
    <PokemonsContext.Provider value={{ pokemons, evolutionChain, getData }}>
      {children}
    </PokemonsContext.Provider>
  );
}
