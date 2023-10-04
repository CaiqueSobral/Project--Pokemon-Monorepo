import { FONTSTART2P } from '../../data/constants';
import React from 'react';
import { Image, Text, View } from 'react-native';

type Props = {
  id: number;
  name: string;
  url: string;
};
export default function PokemonCard(props: Props) {
  return (
    <>
      <View className="w-[30%] h-32 mb-6 bg-white border-4 border-black">
        <View className="flex-1 justify-center">
          <View className="h-[100%] w-auto">
            <Image
              style={{ height: undefined, width: undefined }}
              source={{ uri: props.url }}
              className="flex-1"
            />
          </View>
        </View>
        <View className="absolute left-1 top-1">
          {0 > 1 && <Text className="text-center">{props.id}</Text>}
          <Text style={FONTSTART2P} className="text-center text-[9px]">
            {props.name}
          </Text>
        </View>
        <View className="w-[100%] h-32 absolute border-b-4 border-r-4 border-gray-800 -bottom-2 -right-2 -z-50"></View>
      </View>
    </>
  );
}
