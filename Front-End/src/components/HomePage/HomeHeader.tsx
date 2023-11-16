import React from 'react';
import { Image, View } from 'react-native';
import PrimaryText from '../Custom/PrimaryText';

export default function HomeHeader() {
  return (
    <View className="flex-1 w-full flex-row items-center mt-4 mb-4">
      <View className="flex-1 justify-center items-start pt-[10]">
        <PrimaryText classname={'text-xl'} text="Welcome back, User" />
      </View>
      <View className="flex h-20 w-20 justify-center items-center rounded-full border border-black">
        <Image
          source={require('../../../assets/images/profile/male_pic.png')}
          resizeMode="contain"
          className="w-full h-full rounded-full"
        />
      </View>
    </View>
  );
}
