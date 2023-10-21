import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header/Header';
import { NavigationScreensProps } from '../routes/HomeNavigator';
import React, { Ref, useContext, useRef, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { PokemonsContext } from '../data/context/pokemonsContext';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import PrimaryText from '../components/Custom/PrimaryText';
import Custom8BitRoundedBorders from '../components/Custom/Custom8BitRoundedBorders';
import TravelButtons from '../components/TravelPage/TravelButtons';

export default function TravelPage({ navigation }: NavigationScreensProps) {
  const { habitats, pokemons } = useContext(PokemonsContext);
  const [index, setIndex] = useState(0);

  const pokemonsHabitats = habitats.filter((e) => e.name != 'rare');
  const pokemonsTypes = pokemons
    .filter(
      (pokemon) =>
        pokemon.habitat.toLowerCase() === pokemonsHabitats[index].name,
    )
    .map((pokemon) => {
      return pokemon.types[0];
    });

  const getMostTypes = (types: Array<string>) => {
    return types
      .sort(
        (a, b) =>
          types.filter((v) => v === a).length -
          types.filter((v) => v === b).length,
      )
      .pop();
  };

  const mostType = getMostTypes(pokemonsTypes);
  const mostTypes = [
    mostType,
    getMostTypes(pokemonsTypes.filter((e) => e != mostType)),
  ];
  const getSize = () => {
    return Dimensions.get('window').height * 0.45 >
      Dimensions.get('window').width * 0.9 - 8
      ? Dimensions.get('window').width * 0.9 - 8
      : Dimensions.get('window').height * 0.45 - 8;
  };
  const size = getSize();

  const carouselRef = useRef<ICarouselInstance>(null);
  return (
    <SafeAreaView className="flex-1 items-center">
      <Header title="Travel" openDrawer={navigation.openDrawer} />
      <View className="flex-1 w-[90%] items-center">
        <View className="h-[40%] border-4 mb-2 mt-4">
          <Carousel
            ref={carouselRef}
            width={size}
            data={pokemonsHabitats}
            enabled={false}
            defaultIndex={0}
            scrollAnimationDuration={100}
            onSnapToItem={(index) => setIndex(index)}
            renderItem={(habitat) => {
              return (
                <View className="flex-1 items-center justify-center">
                  <PrimaryText text={habitat.item.name} />
                </View>
              );
            }}
          />
          <Custom8BitRoundedBorders />
        </View>
        <View className="h-[35%] w-full border-4 my-2">
          <Text>{pokemonsHabitats[index].name}</Text>
          <Custom8BitRoundedBorders />
        </View>
        <TravelButtons carouselRef={carouselRef} />
      </View>
    </SafeAreaView>
  );
}
