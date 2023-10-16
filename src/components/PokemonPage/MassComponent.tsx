import React from 'react';
import { View } from 'react-native';
import PrimaryText from '../Custom/PrimaryText';

type Props = {
  height: number;
  weight: number;
};
export default function MassComponent(props: Props) {
  const height =
    props.height >= 100
      ? (props.height / 100).toFixed(2) + 'm'
      : props.height + 'cm';
  return (
    <View className="flex-1 w-[90%] self-center flex-row">
      <View className="flex-1 justify-center">
        <PrimaryText text="Height" classname="text-base text-center" />
        <PrimaryText text={height} classname="text-xs text-center" />
      </View>
      <View className="flex-1 justify-center">
        <PrimaryText text="Weight" classname="text-base text-center" />
        <PrimaryText
          text={props.weight + 'Kg'}
          classname="text-xs text-center"
        />
      </View>
    </View>
  );
}
