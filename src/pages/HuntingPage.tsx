import { HuntingPageScreenProps } from '@/routes/HomeNavigator';
import React, { useContext, useState } from 'react';
import { Dimensions, Image, Pressable, View } from 'react-native';
import BackButton from '../components/Header/BackButton';
import PrimaryText from '../components/Custom/PrimaryText';
import { SafeAreaView } from 'react-native-safe-area-context';
import TravelingAnimation from '../components/HuntingPage/HuntingAnimation';
import { HabitatsColors, pokeballs } from '../data/constants';
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
import TryingToCatchPokemon from '../components/HuntingPage/TryingToCatchPokemonComponent';

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
  const resetOpacity = () => {
    imageOpacity.value = 100; //withSpring(100, { mass: 1, damping: 25 });
  };

  const habitat = route.params.habitat;
  const { pokemons } = useContext(PokemonsContext);
  const pokemonsInHabitat = pokemons.filter(
    (pokemon) => pokemon.habitat.toLowerCase() === habitat.name.toLowerCase(),
  );
  const [selectedPokeball, setSelectedPokeball] = useState(0);
  const [tryToCatch, setTryToCatch] = useState(false);
  const [statusTrainer, setStatusTrainer] = useState<
    'Looking' | 'Found' | 'Trying to Catch'
  >('Looking');
  const [foundPokemon, setFoundPokemon] = useState<PokemonInterface | null>(
    null,
  );

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

  const startAnimation = (runWhenFinished: () => void) => {
    imageOpacity.value = withRepeat(
      withSpring(imageOpacity.value === 100 ? 0 : 100),
      1,
      false,
      (finished) => {
        if (finished) {
          runOnJS(runWhenFinished)();
          runOnJS(resetOpacity)();
        }
      },
    );
  };

  const selectedPokeballStyle = (index: number) => {
    if (statusTrainer != 'Found') {
      return { opacity: 0.3 };
    }
    return { opacity: index === selectedPokeball ? 1 : 0.3 };
  };

  if (!foundPokemon) {
    setFoundPokemon(getRandomPokemon(pokemonsInHabitat));
    setTimeout(
      () => {
        startAnimation(() => {
          setStatusTrainer('Found');
        });
      },
      Math.floor(Math.random() * 4000 + 2000),
    );
  }

  const releasePokemon = () => {
    startAnimation(() => {
      setFoundPokemon(null);
      setStatusTrainer('Looking');
    });
  };

  const isPokemonCaught = (pokemon: PokemonInterface) => {
    const number =
      Math.floor(Math.random() * 250 + 1) -
      pokeballs[selectedPokeball].modifier;
    return number <= pokemon.captureRate;
  };

  const catchPokemon = () => {
    setTryToCatch(true);
    setTimeout(() => {
      setTryToCatch(false);
      startAnimation(() => {
        setStatusTrainer('Trying to Catch');
        setTimeout(() => {
          releasePokemon();
        }, 6000);
      });
    }, 1000);
  };

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
        {statusTrainer === 'Looking' && (
          <Animated.View
            className="flex-1 overflow-hidden"
            style={[animatedFoundOpacityStyle]}
          >
            <TravelingAnimation images={habitat} size={size} />
          </Animated.View>
        )}

        {statusTrainer === 'Found' && foundPokemon && (
          <Animated.View
            className="h-full w-full overflow-hidden"
            style={[animatedFoundOpacityStyle]}
          >
            <PokemonPicture
              sprite={foundPokemon.sprite3d}
              size={size}
              bg={habitat.sprite.bg}
              captureTry={tryToCatch}
              usedPokeball={pokeballs[selectedPokeball].sprite}
            />
          </Animated.View>
        )}

        {statusTrainer === 'Trying to Catch' && foundPokemon && (
          <Animated.View
            className="h-full w-full overflow-hidden"
            style={[animatedFoundOpacityStyle]}
          >
            <TryingToCatchPokemon
              pokemon={foundPokemon.name}
              gotPokemon={isPokemonCaught(foundPokemon)}
              usedPokeball={pokeballs[selectedPokeball].sprite}
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
        <View className="h-1/5 w-4/5 justify-center my-4">
          <PrimaryText
            text={
              statusTrainer != 'Looking' && foundPokemon
                ? `A wild ${foundPokemon.name} appeared`
                : 'Looking for Pokémons'
            }
            classname="text-xs pt-[8] text-center"
          />
        </View>
        <View className="h-1/4 w-full flex-row justify-evenly">
          {pokeballs.map((pokeball, i) => {
            return (
              <View className="h-full w-[25%]" key={i}>
                <Pressable
                  className="flex-1"
                  onPress={() =>
                    statusTrainer === 'Found' ? setSelectedPokeball(i) : null
                  }
                >
                  <Image
                    source={{ uri: pokeball.sprite }}
                    style={selectedPokeballStyle(i)}
                    resizeMode="contain"
                    className="h-3/4 w-full"
                  />
                  <View>
                    <PrimaryText
                      style={selectedPokeballStyle(i)}
                      text={pokeball.name}
                      classname="text-center text-[8px]"
                    />
                  </View>
                </Pressable>
              </View>
            );
          })}
        </View>
        <View className="flex-1 w-full items-center justify-end pb-4 space-y-4">
          <View className="w-full h-12 items-center">
            <PrimaryButton
              text="Catch"
              onPress={() =>
                statusTrainer === 'Found' ? catchPokemon() : null
              }
            />
          </View>
          <View className="w-full h-12 items-center">
            <PrimaryButton
              text="Run"
              onPress={() =>
                statusTrainer === 'Found' ? releasePokemon() : null
              }
            />
          </View>
        </View>
        <Custom8BitRoundedBorders />
      </View>
    </SafeAreaView>
  );
}
