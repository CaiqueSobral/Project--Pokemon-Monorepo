import React from 'react';
import { View } from 'react-native';

export default function Custom8BitBorders() {
  return (
    <View pointerEvents="none" className="absolute w-full h-full">
      <View className="absolute w-full h-[4] bg-black top-full"></View>
      <View className="absolute w-full h-[4] bg-black bottom-full"></View>
      <View className="absolute w-[4] h-full bg-black right-full"></View>
      <View className="absolute w-[4] h-full bg-black left-full"></View>
    </View>
  );
}
