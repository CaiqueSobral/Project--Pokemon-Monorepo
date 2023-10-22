import React from 'react';
import { View } from 'react-native';
import PrimaryButton from '../Custom/PrimaryButton';
import { ICarouselInstance } from 'react-native-reanimated-carousel';

type Props = {
  carouselRef: React.RefObject<ICarouselInstance>;
};

export default function TravelButtons(props: Props) {
  return (
    <View className="flex-1 w-full items-center mt-2 space-y-4">
      <View className="h-[35%] w-full items-center justify-center flex-row space-x-4">
        <View className="flex-1 w-full items-center">
          <PrimaryButton
            text="< Prev."
            onPress={props.carouselRef.current?.prev}
          />
        </View>
        <View className="flex-1 w-full items-center">
          <PrimaryButton
            text="Next >"
            onPress={props.carouselRef.current?.next}
          />
        </View>
      </View>
      <View className="h-[35%] w-full justify-center items-center">
        <PrimaryButton text="Go" />
      </View>
    </View>
  );
}
