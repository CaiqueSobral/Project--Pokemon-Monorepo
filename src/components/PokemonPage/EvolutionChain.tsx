import { PokemonsContext } from '../../data/context/pokemonsContext';
import React, { useContext } from 'react';
import { Image, View } from 'react-native';
import PrimaryText from '../Custom/PrimaryText';

type Props = {
  evolutionChainId: number;
};
export default function EvolutionChain(props: Props) {
  const { pokemons, evolutionChain } = useContext(PokemonsContext);

  const id = props.evolutionChainId;
  const evolutions = evolutionChain.filter((value) => value.id === id);

  return (
    <View className="flex-1 flex-row justify-center items-center">
      {evolutions[0].species.map((item, i) => {
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
              {i != evolutions[0].species.length - 1 && (
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
      })}
    </View>
  );
}
