import React from 'react';
import { View } from 'react-native';
import BackButton from './BackButton';
import PrimaryText from '../Custom/PrimaryText';

type Props = {
  title?: string;
};

export default function BackHeader(props: Props) {
  return (
    <View className="h-[5%] w-[90%] mt-8 items-center self-center">
      <BackButton />

      {props.title && (
        <PrimaryText
          text={props.title}
          classname="pt-[8] text-center w-full text-base"
        />
      )}
    </View>
  );
}
