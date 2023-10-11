import React, { ReactNode } from 'react';
import { View } from 'react-native';
import PrimaryText from './PrimaryText';

type Props = {
  title: string;
  children: ReactNode;
};
export default function ContainerWithTitle(props: Props) {
  return (
    <View className="relative w-[100%] h-[100%] border-4 border-black mb-10 items-center justify-center">
      {props.children}
      <View className="absolute h-full w-full -z-50">
        <View className="absolute bg-black h-[106%] w-[100%] -z-50 -top-[3%]"></View>
        <View className="absolute bg-black h-[100%] w-[104%] -z-50 -left-[2%]"></View>
      </View>
      <PrimaryText
        classname={'absolute text-sm -top-3 text-center left-4 bg-white px-2'}
        text={props.title}
      />
    </View>
  );
}
