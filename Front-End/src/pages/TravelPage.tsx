import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header/Header';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, View } from 'react-native';
import { PokemonsContext } from '../data/context/pokemonsContext';
import PrimaryText from '../components/Custom/PrimaryText';
import Custom8BitRoundedBorders from '../components/Custom/Custom8BitRoundedBorders';
import TypesComponent from '../components/TravelPage/TypesComponent';
import TravelButtons from '../components/TravelPage/TravelButtons';
import { TravelPageScreenProps } from '../routes/HomeNavigator';
import capitalize from '../helpers/helperFunctions';
import { PokemonTypes } from '../interfaces/Pokemon';

export default function TravelPage({ navigation }: TravelPageScreenProps) {
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

  const getMostTypes = (types: Array<PokemonTypes>) => {
    return (
      types
        .sort(
          (a, b) =>
            types.filter((v) => v.type === a.type).length -
            types.filter((v) => v.type === b.type).length,
        )
        .pop() || { type: '', color: '' }
    );
  };

  const mostType = getMostTypes(pokemonsTypes);
  const mostTypes = [
    mostType,
    getMostTypes(pokemonsTypes.filter((e) => e.type != mostType.type)),
  ];
  const getSize = () => {
    return Dimensions.get('window').height * 0.35 >
      Dimensions.get('window').width * 0.9 - 4
      ? Dimensions.get('window').width * 0.9 - 4
      : Dimensions.get('window').height * 0.35 - 4;
  };
  const size = Math.ceil(getSize());

  const next = useCallback(() => {
    const currIndex = index;
    setIndex((index) => {
      return index === pokemonsHabitats.length - 1 ? 0 : index + 1;
    });

    currIndex === index
      ? null
      : carouselRef.current?.scrollToIndex({ index: index });
  }, [index, setIndex]);

  const previous = useCallback(() => {
    const currIndex = index;
    setIndex((index) => {
      return index === 0 ? pokemonsHabitats.length - 1 : index - 1;
    });

    currIndex === index
      ? null
      : carouselRef.current?.scrollToIndex({ index: index });
  }, [index, setIndex]);

  const carouselRef = useRef<FlatList>(null);
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <Header title="Travel" />
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
            className="items-center self-center border-4"
          >
            <FlatList
              ref={carouselRef}
              horizontal
              scrollEnabled={false}
              data={pokemonsHabitats}
              renderItem={(_) => {
                return (
                  <View
                    style={{
                      height: size,
                      width: size,
                    }}
                  >
                    <Image
                      source={{
                        uri: pokemonsHabitats[index].sprite.main,
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
                  text={
                    Math.floor(pokemonsHabitats[index].habitatWeather.tempC) +
                    'ºC'
                  }
                />
              </View>
              <View className="flex-1 w-[75%]">
                <Image
                  source={{
                    uri: pokemonsHabitats[index].habitatWeather.icon,
                  }}
                  resizeMode="contain"
                  className="h-full w-full"
                />
              </View>
            </View>
          </View>

          <Custom8BitRoundedBorders />
        </View>
        <TravelButtons
          nextIndex={next}
          previousIndex={previous}
          navigate={() =>
            navigation.navigate('HuntingPage', {
              habitat: pokemonsHabitats[index],
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}
