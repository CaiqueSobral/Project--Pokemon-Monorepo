import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header/Header';
import { NavigationScreensProps } from '../routes/HomeNavigator';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { WeatherContext } from '../data/context/weatherContext';
import HomeHeader from '../components/HomePage/HomeHeader';
import WeatherView from '../components/HomePage/WeatherView';
import PrimaryButton from '../components/Custom/PrimaryButton';
import TravelingAnimation from '../components/HomePage/TravelAnimation';

export default function HomePage({ navigation }: NavigationScreensProps) {
  const weatherContext = useContext(WeatherContext);

  const dayOfWeek = new Date()
    .toLocaleString('en-us', { weekday: 'long' })
    .split(',')[0];

  return (
    <SafeAreaView className="flex-1 mt-2 bg-white items-center">
      <Header openDrawer={navigation.openDrawer} />
      <View className="h-[40%] w-[90%]">
        <HomeHeader />
        <WeatherView
          temp={weatherContext.currentWeather.weather.tempC}
          city={weatherContext.currentWeather.location.name}
          day={dayOfWeek}
          icon={{ uri: weatherContext.currentWeather.weather.condition.icon }}
        />
      </View>
      <View className="h-[50%] w-full mt-2 items-center">
        <TravelingAnimation
          isDay={weatherContext.currentWeather.weather.isDay}
        />
      </View>
    </SafeAreaView>
  );
}
