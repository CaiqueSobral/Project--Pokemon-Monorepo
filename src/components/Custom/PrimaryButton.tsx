import React from 'react';
import { Pressable, View } from 'react-native';
import PrimaryText from './PrimaryText';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

type Props = {
  text?: string;
  icon?: string;
};
export default function PrimaryButton(props: Props) {
  const buttonIsPressed = useSharedValue(0);

  const animatedBottomShadow = useAnimatedStyle(() => {
    return {
      bottom: buttonIsPressed.value === 0 ? 0 : '100%',
      transform:
        buttonIsPressed.value === 0 ? [{ translateY: 0 }] : [{ translateY: 4 }],
    };
  });

  const animatedRightShadow = useAnimatedStyle(() => {
    return {
      right: buttonIsPressed.value === 0 ? 0 : '100%',
      transform:
        buttonIsPressed.value === 0 ? [{ translateX: 0 }] : [{ translateX: 4 }],
    };
  });

  return (
    <Pressable
      className="w-[95%] h-full max-h-12"
      onPressIn={() => (buttonIsPressed.value = 1)}
      onPressOut={() => (buttonIsPressed.value = 0)}
    >
      <View className="w-full h-full justify-center bg-blue-500">
        {props.text ? (
          <PrimaryText
            text={props.text}
            classname="text-center text-white pt-[7] text-sm"
          />
        ) : (
          <PrimaryText
            text="Button"
            classname="text-center text-white pt-[7] text-sm"
          />
        )}
      </View>
      <View className="absolute w-full h-full -z-50">
        <View className="absolute w-[100%] h-[124%] bg-black -z-50 -top-[12%]"></View>
        <View className="absolute w-[104%] h-[100%] bg-black -z-50 -left-[2%]"></View>
      </View>
      <Animated.View
        style={animatedBottomShadow}
        className="absolute w-full h-1 bg-blue-700"
      ></Animated.View>
      <Animated.View
        style={animatedRightShadow}
        className="absolute h-full w-1 bg-blue-700"
      ></Animated.View>
    </Pressable>
  );
}
