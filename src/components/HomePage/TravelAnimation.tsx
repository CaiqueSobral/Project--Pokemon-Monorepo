import React from 'react';
import { Image, View, Dimensions, Pressable } from 'react-native';
import ContainerWithRoundedBorders from '../Custom/ContainerRoundedBorders';
import Carousel from 'react-native-reanimated-carousel';
import { Easing } from 'react-native-reanimated';
import { cityImages } from '../../data/constants';

type Props = {
  isDay: boolean;
};

export default function TravelingAnimation(props: Props) {
  const getSize = () => {
    return Dimensions.get('window').height * 0.45 >
      Dimensions.get('window').width * 0.9 - 8
      ? Dimensions.get('window').width * 0.9 - 8
      : Dimensions.get('window').height * 0.45 - 8;
  };
  const size = getSize();

  return (
    <Pressable className="flex-1 w-[90%] justify-center items-center mt-4">
      <View style={{ width: size, height: size }}>
        <ContainerWithRoundedBorders>
          <Carousel
            width={size - 8}
            data={cityImages}
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
          <View style={{ width: size, height: size }} className="absolute">
            <Image
              source={require('../../../assets/images/walking.gif')}
              resizeMode="cover"
              className="w-full h-full"
            />
            <Image
              source={
                props.isDay
                  ? require('../../../assets/images/sky/day_sky.png')
                  : require('../../../assets/images/sky/night_sky.png')
              }
              resizeMode="cover"
              className="absolute w-full h-full -z-50"
            />
          </View>
        </ContainerWithRoundedBorders>
      </View>
    </Pressable>
  );
}
