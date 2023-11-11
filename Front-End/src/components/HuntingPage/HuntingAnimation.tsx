import React from 'react';
import { Image, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Easing } from 'react-native-reanimated';
import { HabitatInterface } from '@/interfaces/Pokemon';

type Props = {
  size: number;
  images: Pick<HabitatInterface, 'sprite'>;
};

export default function TravelingAnimation(props: Props) {
  return (
    <View className="flex-1 w-full h-full items-center justify-center">
      <View style={{ width: props.size, height: props.size }}>
        <Carousel
          width={props.size}
          data={[props.images.sprite.ground]}
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
                  style={{ height: props.size, width: props.size + 1 }}
                  resizeMode="contain"
                />
              </View>
            );
          }}
        />
        <View
          style={{ width: props.size, height: props.size }}
          className="absolute"
        >
          <Image
            source={require('../../../assets/images/walking.gif')}
            resizeMode="cover"
            className="w-full h-full"
          />
          <Image
            source={{ uri: props.images.sprite.bg }}
            resizeMode="cover"
            className="absolute w-full h-full -z-50"
          />
        </View>
      </View>
    </View>
  );
}
