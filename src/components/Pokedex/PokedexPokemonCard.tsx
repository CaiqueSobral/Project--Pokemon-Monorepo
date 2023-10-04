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
    <View className="w-[45%] h-32 mb-6  border-4 border-gray-800">
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
    </View>
  );
}
