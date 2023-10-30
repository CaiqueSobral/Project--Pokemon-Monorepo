import { HuntingPageScreenProps } from '@/routes/HomeNavigator';
import React, { useContext, useState } from 'react';
import { Dimensions, View } from 'react-native';
import BackButton from '../components/Header/BackButton';
import PrimaryText from '../components/Custom/PrimaryText';
import { SafeAreaView } from 'react-native-safe-area-context';
import TravelingAnimation from '../components/HuntingPage/HuntingAnimation';
import { cityImages } from '../data/constants';
import Custom8BitRoundedBorders from '../components/Custom/Custom8BitRoundedBorders';
import { PokemonsContext } from '../data/context/pokemonsContext';
import { PokemonInterface } from '../interfaces/Pokemon';
import PrimaryButton from '../components/Custom/PrimaryButton';
import PokemonPicture from '../components/HuntingPage/FoundPokemonComponent';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

function getRandomPokemon(pokemons: Array<PokemonInterface>): PokemonInterface {
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

  const HabitatName = route.params.habitatName;
  const [foundPokemon, setFoundPokemon] = useState<PokemonInterface | null>(
    null,
  );

  const { pokemons } = useContext(PokemonsContext);
  const pokemonsInHabitat = pokemons.filter(
    (pokemon) => pokemon.habitat.toLowerCase() === HabitatName.toLowerCase(),
  );

  const setRandomPoke = () => {
    setFoundPokemon(getRandomPokemon(pokemonsInHabitat));
  };

  // if (!foundPokemon) {
  //   const interval = setInterval(
  //     () => {
  //       setRandomPoke();
  //       clearInterval(interval);
  //     },
  //     Math.floor(Math.random() * 4000 + 2000),
  //   );
  // }

  const getSize = () => {
    return Dimensions.get('window').height * 0.45 >
      Dimensions.get('window').width * 0.9 - 8
      ? Dimensions.get('window').width * 0.9 - 8
      : Dimensions.get('window').height * 0.45 - 8;
  };
  const size = getSize();

  return (
    <SafeAreaView className="flex-1 items-center">
      <View className="h-[5%] w-[90%] mt-8 justify-center items-center">
        <BackButton navigation={navigation.goBack} />
        <PrimaryText
          classname="text-lg px-4 pt-[12] text-center"
          text={HabitatName}
        ></PrimaryText>
      </View>
      <View
        className="mt-8 border-4"
        style={{ width: size, height: size, opacity: 100 }}
      >
        {!foundPokemon && (
          <Animated.View className="flex-1" style={[animatedFoundOpacityStyle]}>
            <TravelingAnimation images={cityImages} size={size} />
          </Animated.View>
        )}

        {foundPokemon && (
          <View className="h-full w-full items-center justify-center">
            <PokemonPicture sprite={foundPokemon.sprite3d} />
          </View>
        )}
        <Custom8BitRoundedBorders />
      </View>
      <View className="flex-1 h-full w-[90%] border-4 mt-12 mb-8 items-center justify-center">
        <View className="h-1/5 w-3/4 justify-center my-4">
          <PrimaryText
            text={
              foundPokemon
                ? `A wild ${foundPokemon?.name} appeared!`
                : 'Looking for pokémons'
            }
            classname="text-[10px] pt-[6] text-center"
          />
        </View>
        <View className="flex-1 w-full items-center justify-end mb-4 space-y-4">
          <View className="w-full h-12 items-center">
            <PrimaryButton text="Catch" onPress={setRandomPoke} />
          </View>
          <View className="w-full h-12 items-center">
            <PrimaryButton
              text="Release"
              onPress={() => setFoundPokemon(null)}
            />
          </View>
        </View>
        <Custom8BitRoundedBorders />
      </View>
    </SafeAreaView>
  );
}
