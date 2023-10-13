import React from 'react';
import { View } from 'react-native';

export default function Custom8BitRoundedBorders() {
  return (
    <View className="absolute h-full w-full -z-50">
      <View className="absolute bg-black h-[4] w-full -z-50 -top-[7]"></View>
      <View className="absolute bg-black h-[4] w-full -z-50 -bottom-[7]"></View>
      <View className="absolute bg-black h-full w-[4] -z-50 -right-[7]"></View>
      <View className="absolute bg-black h-full w-[4] -z-50 -left-[7]"></View>
    </View>
  );
}
