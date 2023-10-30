import React from 'react';
import { Image, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

type Props = {
  sprite: {
    uri: string;
    height: number;
    width: number;
  };
  size: number;
};
export default function PokemonPicture(props: Props) {
  const offsetPokemon = useSharedValue(0);
  const offsetTrainer = useSharedValue(0);

  const animatePokemonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offsetPokemon.value }],
    };
  });
  const animateTrainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -offsetTrainer.value }],
    };
  });

  React.useEffect(() => {
    offsetPokemon.value = withDelay(
      150,
      withSpring(props.size / 3 - 16, { mass: 1, damping: 50 }),
    );
    offsetTrainer.value = withDelay(
      150,
      withSpring(props.size / 2 - 8, { mass: 1, damping: 50 }),
    );
  });

  return (
    <>
      <Animated.View
        style={[animatePokemonStyle]}
        className="h-1/2 w-2/3 absolute left-2 top-4"
      >
        <View className="flex-1 items-center">
          <View className="h-full w-full absolute self-center justify-self-end">
            <Image
              source={require('../../../assets/images/pokemon/field.png')}
              className="w-full h-full opacity-85"
            />
          </View>
          <View className="flex absolute items-center justify-center bottom-[15%]">
            <Image
              height={props.sprite.height * 1.5}
              width={props.sprite.width * 1.5}
              source={{ uri: props.sprite.uri }}
            />
          </View>
        </View>
      </Animated.View>
      <Animated.View
        style={[animateTrainerStyle]}
        className="h-2/3 w-2/3 absolute -bottom-[2] right-0"
      >
        <Image
          source={require('../../../assets/images/trainer-back.png')}
          resizeMode="contain"
          className="h-full w-full"
        />
      </Animated.View>
    </>
  );
}
