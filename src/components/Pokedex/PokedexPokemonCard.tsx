import { FONTSTART2P } from '../../data/constants';
import React from 'react';
import { Image, Text, View } from 'react-native';
import AnimatedPokedexButton from './AnimatedPokedexCard';

type Props = {
  name: string;
  url: string;
};
export default function PokemonCard(props: Props) {
  return (
    <>
      <View className="w-[30%] h-32 mb-6">
        <AnimatedPokedexButton>
          <View className="flex-1 justify-center">
            <View className="h-[100%] w-auto">
              <Image
                source={{ uri: props.url }}
                resizeMode="contain"
                className="h-full w-full"
              />
            </View>
          </View>
          <View className="absolute left-1 top-1">
            <Text style={FONTSTART2P} className="text-center text-[9px]">
              {props.name}
            </Text>
          </View>
        </AnimatedPokedexButton>
        <View className="w-[100%] h-32 absolute border-b-4 border-r-4 border-neutral-700 -bottom-1 -right-1 -z-50"></View>
      </View>
    </>
  );
}
