import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header/Header';
import { NavigationScreensProps } from '../routes/HomeNavigator';
import React, { useContext, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { PokemonsContext } from '../data/context/pokemonsContext';
import { getWeatherData } from '../util/httpWeather';

export default function HomePage({ navigation }: NavigationScreensProps) {
  const pokemonsContext = useContext(PokemonsContext);

  useEffect(() => {
    const getPokemons = async () => {
      await pokemonsContext.getData();
      await getWeatherData();
    };
    getPokemons();
  }, []);

  return (
    <SafeAreaView className="flex-1 mt-2">
      <Header title="" openDrawer={navigation.openDrawer} />
      <View className="flex-1 justify-center items-center">
        <Text>This is the home page</Text>
        <Pressable onPress={navigation.openDrawer}>
          <Text>Open Drawer</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
