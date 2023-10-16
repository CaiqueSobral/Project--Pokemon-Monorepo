import { PokemonDexPageScreenProps } from '@/routes/HomeNavigator';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import BackButton from '../components/Header/BackButton';
import { pokemonTypesColors } from '../data/constants';
import Custom8BitRoundedBorders from '../components/Custom/Custom8BitRoundedBorders';
import ContainerWithRoundedBorders from '../components/Custom/ContainerRoundedBorders';
import PrimaryText from '../components/Custom/PrimaryText';
import TypesComponent from '../components/PokemonPage/TypesComponent';
import MassComponent from '../components/PokemonPage/MassComponent';
import PokemonPicture from '../components/PokemonPage/PokemonPictureComponent';
import EvolutionChain from '../components/PokemonPage/EvolutionChain';

export default function PokemonDexPage({
  navigation,
  route,
}: PokemonDexPageScreenProps) {
  const pokemon = route.params.pokemon;
  const colors: string[] = [];
  const opacity: string = '95';

  const getColors = () => {
    colors.splice(0, colors.length);
    let key: keyof typeof pokemonTypesColors;
    for (const type in pokemon.types) {
      for (key in pokemonTypesColors) {
        if (key === pokemon.types[type]) {
          colors.push(pokemonTypesColors[key]);
        }
      }
    }

    return colors.length > 1
      ? [colors[0] + opacity, colors[1] + opacity]
      : [colors[0] + opacity, colors[0] + opacity];
  };

  return (
    <LinearGradient className="flex-1" colors={getColors()}>
      <SafeAreaView className="flex-1 items-center justify-center">
        <View className="h-[5%] w-[90%] mt-8 justify-center items-center">
          <BackButton navigation={navigation.goBack} />
          <PrimaryText
            classname="text-lg px-4 pt-[12] text-center shadow-white"
            text={pokemon.name}
          ></PrimaryText>
        </View>
        <PokemonPicture sprite={pokemon.sprite3d} colors={getColors()} />
        <View className="flex-1 w-[85%] my-8 bg-white">
          <ContainerWithRoundedBorders>
            <View className="h-full w-full">
              <PrimaryText
                classname="text-sm top-[2%] left-[2%] absolute"
                text={`#${pokemon.id}`}
              />
              <View className="h-[40%] mt-[8%]">
                <TypesComponent types={pokemon.types} colors={colors} />
                <MassComponent
                  height={pokemon.height}
                  weight={pokemon.weight}
                />
              </View>
              <View className="flex-1 items-center justify-center">
                <PrimaryText text="Habitat" />
                <PrimaryText text={pokemon.habitat} />
              </View>
              <View className="flex-1">
                <EvolutionChain evolutionChainId={pokemon.evolutionChainId} />
              </View>
            </View>
          </ContainerWithRoundedBorders>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
