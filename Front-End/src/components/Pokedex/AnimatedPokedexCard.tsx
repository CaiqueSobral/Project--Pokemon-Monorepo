import React, { PropsWithChildren, ReactNode } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  children: ReactNode;
  onPress: () => void;
};

export default function AnimatedPokedexButton(props: Props) {
  const translateValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateValue.value,
        },
        {
          translateY: translateValue.value,
        },
      ],
      borderColor: translateValue.value === 0 ? '#000' : '#404040',
    };
  });

  return (
    <AnimatedPressable
      style={animatedStyle}
      className="h-full w-full bg-white border-4"
      onPress={props.onPress}
      onPressIn={() => (translateValue.value = 4)}
      onPressOut={() => (translateValue.value = 0)}
    >
      {props.children}
    </AnimatedPressable>
  );
}
