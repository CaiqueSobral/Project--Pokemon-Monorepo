import React from 'react';
import { Modal, View } from 'react-native';
import PrimaryText from './PrimaryText';
import Custom8BitRoundedBorders from './Custom8BitRoundedBorders';
import PrimaryButton from './PrimaryButton';

type Props = {
  text: string;
  onPress: () => void;
};

export default function CustomModal(props: Props) {
  return (
    <Modal animationType="fade" transparent={true}>
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      >
        <View className="w-3/4 h-1/4 bg-white justify-center border-4 border-black">
          <PrimaryText
            text={props.text}
            classname="w-full text-center px-4 py-8 leading-6"
          />
          <Custom8BitRoundedBorders />
        </View>
        <View className="w-1/2 h-12 items-center mt-8">
          <PrimaryButton onPress={props.onPress} text="OK" />
        </View>
      </View>
    </Modal>
  );
}
