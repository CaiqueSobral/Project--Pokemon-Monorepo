import React, { ReactNode } from 'react';
import { View } from 'react-native';
import PrimaryText from './PrimaryText';
import Custom8BitRoundedBorders from './Custom8BitRoundedBorders';

type Props = {
  title?: string;
  children: ReactNode;
};
export default function ContainerWithRoundedBorders(props: Props) {
  return (
    <View className="relative w-[100%] h-[100%] border-4 border-black items-center justify-center">
      {props.children}
      <Custom8BitRoundedBorders />
      {props.title && (
        <PrimaryText
          classname={'absolute text-sm -top-3 text-center left-4 bg-white px-2'}
          text={props.title}
        />
      )}
    </View>
  );
}
