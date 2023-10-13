import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header/Header';
import { NavigationScreensProps } from '../routes/HomeNavigator';
import React, { useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { WeatherContext } from '../data/context/weatherContext';
import HomeHeader from '../components/HomePage/HomeHeader';
import WeatherView from '../components/HomePage/WeatherView';
import ContainerNoTitle from '../components/Custom/ContainerNoTitle';
import PrimaryButton from '../components/Custom/PrimaryButton';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import { Easing } from 'react-native-reanimated';

export default function HomePage({ navigation }: NavigationScreensProps) {
  const weatherContext = useContext(WeatherContext);

  const dayOfWeek = new Date()
    .toLocaleString('en-us', { weekday: 'long' })
    .split(',')[0];

  const images = [
    require('../../assets/images/city.png'),
    require('../../assets/images/city1.png'),
  ];
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
        <View className="flex-[4] w-full h-full justify-center bg-white items-center mt-4 -mb-6">
          <View className="w-[256] h-[256]">
            <ContainerNoTitle>
              <Carousel
                width={250}
                data={images}
                autoPlay={true}
                scrollAnimationDuration={3000}
                autoPlayInterval={0}
                pagingEnabled={false}
                snapEnabled={false}
                enabled={false}
                withAnimation={{
                  type: 'timing',
                  config: {
                    easing: Easing.linear,
                    duration: 3000,
                  },
                }}
                renderItem={(item) => {
                  return (
                    <View className="w-[256] h-[252]">
                      <Image
                        source={item.item}
                        resizeMode="cover"
                        className="w-full h-full"
                      />
                    </View>
                  );
                }}
              />
              <View className="absolute w-[256] h-[256] -top-[1]">
                <Image
                  source={require('../../assets/images/walking.gif')}
                  resizeMode="cover"
                  className="w-full h-full"
                />
              </View>
            </ContainerNoTitle>
          </View>
        </View>
        <View className="flex-1 w-[256] h-full items-center justify-center">
          <PrimaryButton text="Travel" />
        </View>
      </View>
    </SafeAreaView>
  );
}
