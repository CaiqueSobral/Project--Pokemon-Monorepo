import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header/Header';
import { NavigationScreensProps } from '../routes/HomeNavigator';
import React, { useContext, useRef, useState } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { PokemonsContext } from '../data/context/pokemonsContext';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import PrimaryText from '../components/Custom/PrimaryText';
import Custom8BitRoundedBorders from '../components/Custom/Custom8BitRoundedBorders';
import TypesComponent from '../components/TravelPage/TypesComponent';
import { WeatherContext } from '../data/context/weatherContext';
import TravelButtons from '../components/TravelPage/TravelButtons';

export default function TravelPage({ navigation }: NavigationScreensProps) {
  const { habitats, pokemons } = useContext(PokemonsContext);
  const [index, setIndex] = useState(0);

  const pokemonsHabitats = [...habitats];

  const pokemonsTypes = pokemons
    .filter(
      (pokemon) =>
        pokemon.habitat.toLowerCase() === pokemonsHabitats[index].name,
    )
    .map((pokemon) => {
      return pokemon.types[0];
    });

  const getMostTypes = (types: Array<string>) => {
    return (
      types
        .sort(
          (a, b) =>
            types.filter((v) => v === a).length -
            types.filter((v) => v === b).length,
        )
        .pop() || ''
    );
  };

  const mostType = getMostTypes(pokemonsTypes);
  const mostTypes = [
    mostType,
    getMostTypes(pokemonsTypes.filter((e) => e != mostType)),
  ];
  const getSize = () => {
    return Dimensions.get('window').height * 0.35 >
      Dimensions.get('window').width * 0.9 - 4
      ? Dimensions.get('window').width * 0.9 - 4
      : Dimensions.get('window').height * 0.35 - 4;
  };
  const size = getSize();

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1, str.length);
  };

  const carouselRef = useRef<ICarouselInstance>(null);
  return (
    <SafeAreaView className="flex-1 items-center">
      <Header title="Travel" openDrawer={navigation.openDrawer} />
      <View className="flex-1 w-[90%] items-center">
        <View className="h-4/5 w-full border-4 mb-2 mt-4">
          <View className="justify-center items-center w-full my-4">
            <PrimaryText
              classname="text-lg pt-[8]"
              text={capitalize(pokemonsHabitats[index].name)}
            />
          </View>
          <View
            style={{ height: size, width: size }}
            className="items-center self-center"
          >
            <Carousel
              ref={carouselRef}
              width={size}
              height={size}
              data={pokemonsHabitats}
              enabled={true}
              scrollAnimationDuration={100}
              onSnapToItem={(index) => setIndex(index)}
              style={{
                borderColor: 'black',
                borderWidth: 4,
                justifyContent: 'center',
              }}
              renderItem={(habitat) => {
                return (
                  <View style={{ height: size, width: size }}>
                    <Image
                      source={{
                        uri: habitat.item.sprite,
                      }}
                      resizeMode="cover"
                      className="h-full w-full"
                    />
                  </View>
                );
              }}
            />
          </View>
          <View className="flex-1 items-center justify-start mt-8">
            <View className="w-[75%] items-center">
              <PrimaryText text="Common types" />
            </View>
            <View className="h-1/6 mt-2">
              <TypesComponent types={mostTypes} />
            </View>
            <View className="w-[75%] items-center mt-8 mb-2">
              <PrimaryText text="Weather" />
            </View>
            <View className="h-2/5 w-[75%] items-center flex-row mb-2">
              <View className="flex-1">
                <PrimaryText
                  classname="text-center text-lg mt-[12]"
                  text={habitats[index].habitatWeather.weather.tempC + 'ºC'}
                />
              </View>
              <View className="flex-1 w-[75%]">
                <Image
                  source={{
                    uri: habitats[index].habitatWeather.weather.condition.icon,
                  }}
                  resizeMode="contain"
                  className="h-full w-full"
                />
              </View>
            </View>
          </View>

          <Custom8BitRoundedBorders />
        </View>
        <TravelButtons carouselRef={carouselRef} />
      </View>
    </SafeAreaView>
  );
}
