import {
  EvolutionChainInterface,
  PokemonInterface,
} from '../../interfaces/Pokemon';
import { getAllPokemons } from '../../util/http';
import { PropsWithChildren, createContext, useState } from 'react';

export const PokemonsContext = createContext({
  pokemons: [] as Array<PokemonInterface>,
  evolutionChain: [] as Array<EvolutionChainInterface>,
  getData: () => {},
});

export default function PokemonsContextProvider({
  children,
}: PropsWithChildren) {
  const [pokemons, setPokemons] = useState<Array<PokemonInterface>>([]);
  const [evolutionChain, setEvolutionChain] = useState<
    Array<EvolutionChainInterface>
  >([]);

  const getData = async () => {
    if (!pokemons.length && !evolutionChain.length) {
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
