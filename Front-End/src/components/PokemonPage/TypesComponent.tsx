import React from 'react';
import { View } from 'react-native';
import PrimaryText from '../Custom/PrimaryText';
import Custom8BitBorders from '../Custom/Custom8BitBorders';
import { pokemonTypes } from '../../interfaces/Pokemon';
import capitalize from '../../helpers/helperFunctions';

type Props = {
  types: Array<pokemonTypes>;
};

export default function TypesComponent(props: Props) {
  return (
    <View className="flex-1 w-[90%] self-center justify-center">
      <View>
        <PrimaryText text="Types" classname="text-base pt-[6] text-center" />
      </View>
      <View className="flex-1 flex-row gap-x-4 justify-center items-center">
        {props.types.map((type, i) => {
          return (
            <View
              key={i}
              className="h-6 w-1/3 items-center justify-center"
              style={{ backgroundColor: type.color }}
            >
              <PrimaryText
                text={capitalize(type.type)}
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
