import { pokeballs } from '../../data/constants';
import React, { useState } from 'react';
import { Image, LayoutChangeEvent, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  sprite: {
    uri: string;
    height: number;
    width: number;
  };
  size: number;
  bg: string;
  captureTry: boolean;
  usedPokeball: string;
};
export default function PokemonPicture(props: Props) {
  const offsetPokemon = useSharedValue(0);
  const offsetTrainer = useSharedValue(0);
  const offsetBg = useSharedValue(0);
  const offsetPokeball = useSharedValue({ x: -50, y: 40 });
  const pokeballRotation = useSharedValue(0);
  const [pokeballVisible, setPokeballVisible] = useState(false);

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

  const animateBgStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -offsetBg.value }],
    };
  });

  const animatePokeball = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offsetPokeball.value.x },
        { translateY: offsetPokeball.value.y },
        { rotate: pokeballRotation.value * 360 + 'deg' },
      ],
    };
  });

  React.useEffect(() => {
    pokeballRotation.value = withRepeat(
      withTiming(1, {
        duration: 400,
      }),
      -1,
    );
    offsetPokemon.value = withDelay(
      150,
      withSpring(props.size / 3 - 16, { mass: 1, damping: 50 }),
    );
    offsetTrainer.value = withDelay(
      150,
      withSpring(props.size / 2 - 32, { mass: 1, damping: 50 }),
    );
    offsetBg.value = withDelay(
      150,
      withSpring(-(props.size / 1.25 - props.size), { mass: 1, damping: 50 }),
    );
  });

  if (props.captureTry) {
    setTimeout(() => {
      setPokeballVisible(true);
      offsetPokeball.value = withTiming({ x: 0, y: 0 }, { duration: 400 });
    }, 600);
  }

  return (
    <>
      <View
        style={{ height: props.size - 8, width: props.size - 8 }}
        className="absolute overflow-hidden"
      >
        <View className="w-full h-full opacity-50 bg-white"></View>
        <Animated.Image
          style={[
            { height: props.size, width: props.size * 1.25 },
            animateBgStyle,
          ]}
          source={{ uri: props.bg }}
          className="opacity-40 left-0 absolute"
        />
      </View>
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
          <View className="flex absolute items-center justify-center bottom-[10%]">
            <Image
              height={props.sprite.height * 1.5}
              width={props.sprite.width * 1.5}
              source={{ uri: props.sprite.uri }}
            />
            {pokeballVisible && (
              <Animated.Image
                height={48}
                width={48}
                source={{ uri: props.usedPokeball }}
                style={[animatePokeball]}
                className="absolute"
              />
            )}
          </View>
        </View>
      </Animated.View>
      <Animated.View
        style={[animateTrainerStyle]}
        className="h-2/3 w-2/3 absolute -bottom-[2] right-0"
      >
        <Image
          source={
            props.captureTry
              ? require('../../../assets/images/trainer-throwing.gif')
              : require('../../../assets/images/trainer-back.png')
          }
          resizeMode="contain"
          className="h-full w-full"
        />
      </Animated.View>
    </>
  );
}
