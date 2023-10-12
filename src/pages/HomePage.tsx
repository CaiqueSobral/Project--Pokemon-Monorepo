import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header/Header';
import { NavigationScreensProps } from '../routes/HomeNavigator';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { WeatherContext } from '../data/context/weatherContext';
import HomeHeader from '../components/HomePage/HomeHeader';
import WeatherView from '../components/HomePage/WeatherView';
import PrimaryButton from '../components/Custom/PrimaryButton';
import ContainerWithTitle from '../components/Custom/ContainerWithTitle';

export default function HomePage({ navigation }: NavigationScreensProps) {
  const weatherContext = useContext(WeatherContext);

  const dayOfWeek = new Date()
    .toLocaleString('en-us', { weekday: 'long' })
    .split(',')[0];

  const buttons = ['Pokédex', 'Travel', 'Backpack', 'Your Pokémons', 'Profile'];
  return (
    <SafeAreaView className="flex-1 mt-2 bg-white">
      <Header title="" openDrawer={navigation.openDrawer} />
      <View className="flex-1 m-4 items-center">
        <HomeHeader />
        <WeatherView
          temp={weatherContext.currentWeather.weather.tempC}
          city={weatherContext.currentWeather.location.name}
          day={dayOfWeek}
          icon={{ uri: weatherContext.currentWeather.weather.condition.icon }}
        />
        <View className="flex-1 w-full h-full justify-center items-center my-4">
          {buttons.map((button, i) => {
            return (
              <View
                key={i}
                className="flex-1 w-full items-center justify-center"
              >
                <PrimaryButton text={button} />
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}
