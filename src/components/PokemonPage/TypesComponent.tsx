import React from 'react';
import { View } from 'react-native';
import PrimaryText from '../Custom/PrimaryText';
import Custom8BitBorders from '../Custom/Custom8BitBorders';

type Props = {
  types: Array<string>;
  colors: Array<string>;
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
              style={{ backgroundColor: props.colors[i] }}
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
