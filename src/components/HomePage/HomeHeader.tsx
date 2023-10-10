import { FONTSTART2P } from '../../data/constants';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import PrimaryText from '../Custom/PrimaryText';

export default function HomeHeader() {
  return (
    <View className="h-[10%] w-full flex-row items-center mt-2 mb-10">
      <View className="flex-[2] justify-center items-start">
        <PrimaryText classname={'text-xl'} text="Welcome back, User" />
      </View>
      <View className="flex-1 justify-center items-center">
        <Image
          source={{
            uri: 'https://i.pinimg.com/736x/96/f1/9b/96f19ba5dadc7150b6624d77e344bfd3.jpg',
          }}
          resizeMode="contain"
          className="h-20 w-20 rounded-full"
        />
      </View>
    </View>
  );
}
