import React from 'react';
import { View } from 'react-native';

export default function Custom8BitBorders() {
  return (
    <View className="absolute w-full h-full -z-50">
      <View className="absolute w-full h-[4] bg-black -z-50 top-[100%]"></View>
      <View className="absolute w-full h-[4] bg-black -z-50 bottom-[100%]"></View>
      <View className="absolute w-[4] h-full bg-black -z-50 right-[100%]"></View>
      <View className="absolute w-[4] h-full bg-black -z-50 left-[100%]"></View>
    </View>
  );
}
