import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header/Header';
import { NavigationScreensProps } from '../routes/HomeNavigator';
import React, { useContext, useRef, useState } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { PokemonsContext } from '../data/context/pokemonsContext';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import PrimaryText from '../components/Custom/PrimaryText';
import Custom8BitRoundedBorders from '../components/Custom/Custom8BitRoundedBorders';
import PrimaryButton from '../components/Custom/PrimaryButton';
import TypesComponent from '../components/TravelPage/TypesComponent';
import { WeatherContext } from '../data/context/weatherContext';

export default function TravelPage({ navigation }: NavigationScreensProps) {
  const { habitats, pokemons } = useContext(PokemonsContext);
  const weather = useContext(WeatherContext);
  const [index, setIndex] = useState(0);

  const pokemonsHabitats = [...habitats];
  console.log(pokemonsHabitats);
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
    return Dimensions.get('window').height * 0.4 >
      Dimensions.get('window').width * 0.9 - 8
      ? Dimensions.get('window').width * 0.9 - 8
      : Dimensions.get('window').height * 0.4 - 8;
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
        <View
          style={{ height: size, width: size }}
          className="border-4 mb-2 mt-4"
        >
          <Carousel
            ref={carouselRef}
            width={size - 8}
            data={pokemonsHabitats}
            enabled={true}
            scrollAnimationDuration={100}
            onSnapToItem={(index) => setIndex(index)}
            renderItem={(habitat) => {
              return (
                <View className="h-full w-full">
                  <Image
                    source={{
                      uri: habitat.item.sprite,
                    }}
                    resizeMode="contain"
                    className="h-full w-full"
                  />
                </View>
              );
            }}
          />
          <Custom8BitRoundedBorders />
        </View>
        <View className="h-[35%] w-full border-4 my-2">
          <View className="h-[20%] justify-center items-center w-full">
            <PrimaryText
              classname="text-lg"
              text={capitalize(pokemonsHabitats[index].name)}
            />
          </View>
          <View className="flex-1 items-center justify-start mt-2">
            <View className="h-[20%] w-[75%] items-start">
              <PrimaryText text="Common types" />
            </View>
            <View className="h-[70%]">
              <TypesComponent types={mostTypes} />
            </View>
          </View>
          <View className="flex-1 items-center justify-start mt-2">
            <View className="h-[20%] w-[75%] items-start">
              <PrimaryText text="Weather" />
            </View>
            <View className="flex-1 w-[75%] items-center flex-row mb-2">
              <View className="flex-1">
                <PrimaryText
                  classname="text-center text-lg mt-[12]"
                  text={weather.currentWeather.weather.tempC + 'ºC'}
                />
              </View>
              <View className="flex-1 w-[75%]">
                <Image
                  source={{
                    uri: weather.currentWeather.weather.condition.icon,
                  }}
                  resizeMode="contain"
                  className="h-full w-full"
                />
              </View>
            </View>
          </View>

          <Custom8BitRoundedBorders />
        </View>
        <View className="flex-1 w-full items-center my-2 space-y">
          <View className="flex-1 w-full items-center justify-center flex-row space-x-4">
            <View className="flex-1 w-full items-center">
              <PrimaryButton
                text="< Prev."
                onPress={carouselRef.current?.prev}
              />
            </View>
            <View className="flex-1 w-full items-center">
              <PrimaryButton
                text="Next >"
                onPress={carouselRef.current?.next}
              />
            </View>
          </View>
          <View className="flex-1 w-full justify-center items-center">
            <PrimaryButton text="Go" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
