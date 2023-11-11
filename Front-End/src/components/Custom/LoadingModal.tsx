import React from 'react';
import { Modal, View } from 'react-native';
import PrimaryText from './PrimaryText';
import Custom8BitRoundedBorders from './Custom8BitRoundedBorders';

export default function LoadingModal() {
  return (
    <Modal animationType="fade" transparent={true}>
      <View className="flex-1 justify-center items-center bg-[#cccccc40]">
        <View className="h-[256] w-[256] bg-[#ffffff] justify-center border-4 border-black opacity-90">
          <PrimaryText text="Loading" classname="w-full text-center" />
          <Custom8BitRoundedBorders />
        </View>
      </View>
    </Modal>
  );
}
