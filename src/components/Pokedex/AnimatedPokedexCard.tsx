import React, { PropsWithChildren } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AnimatedPokedexButton({ children }: PropsWithChildren) {
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
      className="h-full h-full bg-white border-4"
      onPressIn={() => (translateValue.value = 4)}
      onPressOut={() => (translateValue.value = 0)}
    >
      {children}
    </AnimatedPressable>
  );
}
