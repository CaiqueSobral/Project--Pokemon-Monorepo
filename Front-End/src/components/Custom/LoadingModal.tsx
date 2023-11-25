import React from 'react';
import { Modal, View } from 'react-native';
import PrimaryText from './PrimaryText';
import Custom8BitRoundedBorders from './Custom8BitRoundedBorders';

export default function LoadingModal() {
  return (
    <Modal animationType="fade" transparent={true}>
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
      >
        <View className="h-1/5 w-3/4 bg-white justify-center border-4 border-black">
          <PrimaryText text="Loading" classname="w-full text-center" />
          <Custom8BitRoundedBorders />
        </View>
      </View>
    </Modal>
  );
}
