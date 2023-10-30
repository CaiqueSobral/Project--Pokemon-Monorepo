import React from 'react';
import { Image, View } from 'react-native';

type Props = {
  sprite: {
    uri: string;
    height: number;
    width: number;
  };
};
export default function PokemonPicture(props: Props) {
  return (
    <View className="h-[75%] w-full">
      <View className="flex-1 items-center">
        <View className="h-full w-full absolute self-center justify-self-end bottom-[5%]">
          <Image
            source={require('../../../assets/images/pokemon/field.png')}
            className="w-full h-full opacity-85"
          />
        </View>
        <View className="flex absolute items-center justify-center bottom-[15%]">
          <Image
            height={props.sprite.height * 2}
            width={props.sprite.width * 2}
            source={{ uri: props.sprite.uri }}
          />
        </View>
      </View>
    </View>
  );
}
