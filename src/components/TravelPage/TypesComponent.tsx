import React from 'react';
import { View } from 'react-native';
import PrimaryText from '../Custom/PrimaryText';
import Custom8BitBorders from '../Custom/Custom8BitBorders';
import { pokemonTypesColors } from '../../data/constants';

type Props = {
  types: Array<string>;
};

export default function (props: Props) {
  const colors: Array<string> = [];

  colors.splice(0, colors.length);
  let key: keyof typeof pokemonTypesColors;
  for (const type in props.types) {
    for (key in pokemonTypesColors) {
      if (key === props.types[type]) {
        colors.push(pokemonTypesColors[key]);
      }
    }
  }

  return (
    <View className="flex-1 w-[90%] self-center justify-center">
      <View className="flex-1 flex-row gap-x-4 justify-center items-center">
        {props.types.map((type, i) => {
          return (
            <View
              key={i}
              className="h-6 w-2/5 items-center justify-center"
              style={{ backgroundColor: colors[i] }}
            >
              <PrimaryText
                text={type.charAt(0).toUpperCase() + type.slice(1)}
                classname="text-[10px] pt-[4] text-white"
              />
              <Custom8BitBorders />
            </View>
          );
        })}
      </View>
    </View>
  );
}
