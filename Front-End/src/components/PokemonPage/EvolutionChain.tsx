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

  const notChain =
    poke.name.toLowerCase() === 'hitmonchan' ||
    poke.name.toLowerCase() === 'hitmonlee';
  if (notChain) {
    evolutions.species.splice(0, evolutions.species.length);
    evolutions.species.push({
      id: poke.id,
      name: poke.name,
      sprite: poke.sprite,
    });
  }

  const isEeveeEvolution = evolutions.species.some(
    (e) => e.name.toLowerCase() === 'eevee' && !isEevee,
  );

  const renderChain = (
    items: Array<{ id: number; name: string; sprite: string }>,
  ) => {
    return items.map((item, i) => {
      return (
        <View key={i} className="w-[30%] items-center justify-center">
          <View className="h-2/3 w-10/12">
            <Image
              source={{
                uri: item.sprite,
              }}
              resizeMode="contain"
              className="h-full w-full"
            />
            {i != items.length - 1 && !isEevee && (
              <View className="h-4 w-4 absolute left-full top-[60%] rotate-180">
                <Image
                  source={require('../../../assets/icons/back-icon.png')}
                  resizeMode="contain"
                  className="h-full w-full"
                />
              </View>
            )}
          </View>
          <View>
            <PrimaryText text={item.name} classname="text-[8px]" />
          </View>
        </View>
      );
    });
  };

  const renderEevee = (
    items: Array<{ id: number; name: string; sprite: string }>,
  ) => {
    return (
      <View className="flex-1 justify-center items-center -mt-4">
        <View className="w-2/5 h-full items-center justify-end">
          <View className="h-full w-full">
            <Image
              source={{
                uri: pokemons.filter((poke) => poke.id === items[0].id)[0]
                  .sprite,
              }}
              resizeMode="contain"
              className="h-full w-full"
            />
            <View
              style={{
                transform: [{ translateY: 20 }],
                justifyContent: 'space-between',
              }}
              className="h-4 w-full absolute top-full flex-row items-center"
            >
              {items.map((_, i) => {
                return (
                  i != 0 && (
                    <Image
                      key={i}
                      style={{
                        transform: [{ rotate: -45 * i + 'deg' }],
                      }}
                      source={require('../../../assets/icons/back-icon.png')}
                      resizeMode="contain"
                      className="h-3 w-3"
                    />
                  )
                );
              })}
            </View>
          </View>
          <View className="w-full">
            <PrimaryText
              text={items[0].name}
              classname="text-[8px] text-center"
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      {isEevee && renderEevee(evolutions.species)}
      <View className="flex-1 flex-row justify-center items-center">
        {isEevee &&
          renderChain(
            evolutions.species.filter((e) => e.name.toLowerCase() != 'eevee'),
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
    </>
  );
}
