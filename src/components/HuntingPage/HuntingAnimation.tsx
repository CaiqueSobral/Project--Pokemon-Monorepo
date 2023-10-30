import React, { useContext } from 'react';
import { Image, View, Dimensions, Pressable } from 'react-native';
import ContainerWithRoundedBorders from '../Custom/ContainerRoundedBorders';
import Carousel from 'react-native-reanimated-carousel';
import { Easing } from 'react-native-reanimated';
import { WeatherContext } from '../../data/context/weatherContext';

type Props = {
  size: number;
  images: Array<string>;
};

export default function TravelingAnimation(props: Props) {
  const {
    currentWeather: {
      weather: { isDay },
    },
  } = useContext(WeatherContext);

  return (
    <Pressable className="flex-1 w-full h-full">
      <View style={{ width: props.size, height: props.size - 8 }}>
        <Carousel
          width={props.size - 8}
          data={props.images}
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
              duration: 3250,
            },
          }}
          renderItem={(item) => {
            return (
              <View className="flex-1">
                <Image
                  source={{ uri: item.item }}
                  resizeMode="cover"
                  className="w-full h-full"
                />
              </View>
            );
          }}
        />
        <View
          style={{ width: props.size - 8, height: props.size - 8 }}
          className="absolute"
        >
          <Image
            source={require('../../../assets/images/walking.gif')}
            resizeMode="cover"
            className="w-full h-full"
          />
          <Image
            source={
              isDay
                ? require('../../../assets/images/sky/day_sky.png')
                : require('../../../assets/images/sky/night_sky.png')
            }
            resizeMode="cover"
            className="absolute w-full h-full -z-50"
          />
        </View>
      </View>
    </Pressable>
  );
}
