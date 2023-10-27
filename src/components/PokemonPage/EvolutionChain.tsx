import { PokemonsContext } from '../../data/context/pokemonsContext';
import React, { useContext } from 'react';
import { Image, View } from 'react-native';
import PrimaryText from '../Custom/PrimaryText';
import { EvolutionChainInterface } from '../../interfaces/Pokemon';

type Props = {
  evolutionChainId: number;
  pokemonId: number;
};
export default function EvolutionChain(props: Props) {
  const { pokemons, evolutionChain } = useContext(PokemonsContext);

  const id = props.evolutionChainId;
  const poke = pokemons.filter((e) => e.id === props.pokemonId)[0];
  const isEevee =
    pokemons.filter((e) => e.id === props.pokemonId)[0].name.toLowerCase() ===
    'eevee';

  const evolutions: EvolutionChainInterface = evolutionChain.filter(
    (value) => value.id === id,
  )[0];

  const isEeveeEvolution = evolutions.species.some(
    (e) => e.name.toLowerCase() === 'eevee' && !isEevee,
  );

  const renderChain = (
    items: Array<{ id: number; name: string; sprite: string }>,
  ) => {
    return items.map((item, i) => {
      return (
        <View key={i} className="w-[30%] items-center justify-center">
          <View className="flex-[3] h-full w-full mb-2">
            <Image
              source={{
                uri: pokemons.filter((poke) => poke.id === item.id)[0].sprite,
              }}
              resizeMode="contain"
              className="h-full w-full"
            />
            {i != items.length - 1 && !isEevee && (
              <View className="h-4 w-4 absolute right-0 top-[50%] translate-y-[8px] translate-x-[8px] rotate-180">
                <Image
                  source={require('../../../assets/icons/back-icon.png')}
                  resizeMode="contain"
                  className="h-full w-full"
                />
              </View>
            )}
          </View>
          <View className="flex-1">
            <PrimaryText text={item.name} classname="text-[8px]" />
          </View>
        </View>
      );
    });
  };

  return (
    <View className="flex-1 flex-row justify-center items-center">
      {isEevee &&
        renderChain(
          evolutions.species.filter(
            (item) => item.name.toLowerCase() === 'eevee',
          ),
        )}
      {!isEevee && !isEeveeEvolution && renderChain(evolutions.species)}
      {!isEevee &&
        isEeveeEvolution &&
        renderChain(
          evolutions.species.filter(
            (item) =>
              item.name.toLowerCase() === 'eevee' || item.id === poke.id,
          ),
        )}
    </View>
  );
}
