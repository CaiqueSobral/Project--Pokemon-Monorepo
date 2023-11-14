import React from 'react';
import { View } from 'react-native';
import PrimaryButton from '../Custom/PrimaryButton';

type Props = {
  nextIndex: () => void;
  previousIndex: () => void;
  navigate: () => void;
};

export default function TravelButtons(props: Props) {
  return (
    <View className="flex-1 w-full items-center mt-2 space-y-4">
      <View className="h-[35%] w-full items-center justify-center flex-row space-x-4">
        <View className="flex-1 w-full items-center">
          <PrimaryButton text="< Prev." onPress={() => props.previousIndex()} />
        </View>
        <View className="flex-1 w-full items-center">
          <PrimaryButton text="Next >" onPress={() => props.nextIndex()} />
        </View>
      </View>
      <View className="h-[35%] w-full justify-center items-center">
        <PrimaryButton text="Go" onPress={props.navigate} />
      </View>
    </View>
  );
}
