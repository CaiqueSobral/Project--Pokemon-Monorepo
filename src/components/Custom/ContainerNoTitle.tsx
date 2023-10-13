import React, { ReactNode } from 'react';
import { View } from 'react-native';
import PrimaryText from './PrimaryText';
import Custom8BitRoundedBorders from './Custom8BitRoundedBorders';

type Props = {
  children: ReactNode;
};
export default function ContainerWithTitle(props: Props) {
  return (
    <View className="relative w-[100%] h-[100%] border-4 border-black items-center justify-center">
      {props.children}
      <Custom8BitRoundedBorders />
    </View>
  );
}
