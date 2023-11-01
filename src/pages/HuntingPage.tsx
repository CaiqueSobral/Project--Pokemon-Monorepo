import { HuntingPageScreenProps } from '@/routes/HomeNavigator';
import React, { useContext, useState } from 'react';
import { Dimensions, View } from 'react-native';
import BackButton from '../components/Header/BackButton';
import PrimaryText from '../components/Custom/PrimaryText';
import { SafeAreaView } from 'react-native-safe-area-context';
import TravelingAnimation from '../components/HuntingPage/HuntingAnimation';
import { HabitatsColors, cityImages } from '../data/constants';
import Custom8BitRoundedBorders from '../components/Custom/Custom8BitRoundedBorders';
import { PokemonsContext } from '../data/context/pokemonsContext';
import { PokemonInterface } from '../interfaces/Pokemon';
import PrimaryButton from '../components/Custom/PrimaryButton';
import PokemonPicture from '../components/HuntingPage/FoundPokemonComponent';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';
import capitalize from '../helpers/helperFunctions';

function getRandomPokemon(pokemons: Array<PokemonInterface>) {
  const randomId = Math.floor(Math.random() * pokemons.length);
  const pokemonsRand = [...pokemons][randomId];
  return pokemonsRand;
}

export default function HuntingPage({
  route,
  navigation,
}: HuntingPageScreenProps) {
  const imageOpacity = useSharedValue(100);
  const animatedFoundOpacityStyle = useAnimatedStyle(() => {
    return { opacity: imageOpacity.value };
  });

  const habitat = route.params.habitat;
  const { pokemons } = useContext(PokemonsContext);
  const pokemonsInHabitat = pokemons.filter(
    (pokemon) => pokemon.habitat.toLowerCase() === habitat.name.toLowerCase(),
  );
  const [foundPokemon, setFoundPokemon] = useState<PokemonInterface | null>(
    null,
  );
  const setRandomPokemon = () => {
    setFoundPokemon(getRandomPokemon(pokemonsInHabitat));
  };
  const clearFoundPokemon = () => {
    setFoundPokemon(null);
  };

  const getSize = () => {
    return Dimensions.get('window').height * 0.45 >
      Dimensions.get('window').width * 0.9 - 8
      ? Dimensions.get('window').width * 0.9 - 8
      : Dimensions.get('window').height * 0.45 - 8;
  };
  const size = Math.ceil(getSize());

  const getColor = () => {
    let key: keyof typeof HabitatsColors;
    for (key in HabitatsColors) {
      if (key === habitat.name.toLowerCase()) return HabitatsColors[key] + '90';
    }
  };

  const resetOpacity = () => {
    imageOpacity.value = withSpring(100, { mass: 1, damping: 25 });
  };
  const startAnimation = () => {
    imageOpacity.value = withRepeat(
      withSpring(imageOpacity.value === 100 ? 0 : 100),
      1,
      false,
      (finished) => {
        if (finished) {
          if (!foundPokemon) {
            runOnJS(setRandomPokemon)();
            runOnJS(resetOpacity)();
          } else {
            runOnJS(clearFoundPokemon)();
            runOnJS(resetOpacity)();
          }
        }
      },
    );
  };

  if (!foundPokemon) {
    const interval = setInterval(
      () => {
        startAnimation();
        clearInterval(interval);
      },
      Math.floor(Math.random() * 4000 + 2000),
    );
  }

  return (
    <SafeAreaView
      className="flex-1 items-center"
      style={{ backgroundColor: getColor() }}
    >
      <View className="h-[5%] w-[90%] mt-8 justify-center items-center">
        <BackButton navigation={navigation.goBack} />
        <PrimaryText
          classname="text-lg px-4 pt-[12] text-center"
          text={capitalize(habitat.name)}
        ></PrimaryText>
      </View>
      <View
        className="mt-6 border-4 bg-gray-100"
        style={{ width: size, height: size }}
      >
        {!foundPokemon && (
          <Animated.View
            className="flex-1 overflow-hidden"
            style={[animatedFoundOpacityStyle]}
          >
            <TravelingAnimation images={habitat} size={size} />
          </Animated.View>
        )}

        {foundPokemon && (
          <Animated.View
            className="h-full w-full"
            style={[animatedFoundOpacityStyle]}
          >
            <PokemonPicture
              sprite={foundPokemon.sprite3d}
              size={size}
              bg={habitat.sprite.bg}
            />
          </Animated.View>
        )}
        <Custom8BitRoundedBorders />
      </View>
      <View
        style={{ width: size }}
        className="flex-1 h-full border-4 mt-8 mb-6 items-center justify-center bg-white"
      >
        <View className="h-1/5 w-3/4 justify-center my-4">
          <PrimaryText
            text={
              foundPokemon
                ? `A wild ${foundPokemon?.name} appeared!`
                : 'Looking for pokémons'
            }
            classname="text-xs pt-[8] text-center"
          />
        </View>
        <View className="flex-1 w-full items-center justify-end mb-4 space-y-4">
          <View className="w-full h-12 items-center">
            <PrimaryButton text="Catch" />
          </View>
          <View className="w-full h-12 items-center">
            <PrimaryButton text="Release" onPress={() => startAnimation()} />
          </View>
        </View>
        <Custom8BitRoundedBorders />
      </View>
    </SafeAreaView>
  );
}
