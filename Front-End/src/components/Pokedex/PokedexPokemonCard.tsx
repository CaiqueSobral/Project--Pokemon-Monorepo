import React from 'react';
import { Image, Text, View } from 'react-native';
import AnimatedPokedexButton from './AnimatedPokedexCard';
import PrimaryText from '../Custom/PrimaryText';
import { pokeballs } from '../../data/constants';

type Props = {
  name: string;
  url: string;
  status?: 'seen' | 'caught';
  onPress: () => void;
};
export default function PokemonCard(props: Props) {
  return (
    <>
      <View className="w-[30%] h-32 mb-6">
        <AnimatedPokedexButton onPress={props.onPress}>
          <View className="flex-1 justify-center">
            <View className="h-[100%] w-auto">
              <Image
                source={{ uri: props.url }}
                resizeMode="contain"
                className="h-full w-full"
                style={props.status ? {} : { tintColor: 'black' }}
              />
            </View>
          </View>
          <View className="absolute left-1 top-1">
            <PrimaryText
              text={props.status ? props.name : '???'}
              classname="text-center text-[9px]"
            />
          </View>
          {props.status === 'caught' && (
            <View className="h-4 w-4 absolute right-1 bottom-1">
              <Image
                source={{ uri: pokeballs[0].sprite }}
                resizeMode="contain"
                className="h-full w-full"
              />
            </View>
          )}
        </AnimatedPokedexButton>
        <View className="w-full h-32 absolute border-b-4 border-r-4 border-neutral-700 -bottom-1 -right-1 -z-50"></View>
      </View>
    </>
  );
}
