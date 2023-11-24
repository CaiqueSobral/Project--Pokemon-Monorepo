import BackHeader from '../components/Header/BackHeader';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChooseStarterPageScreenProps } from '../routes/HomeNavigator';

export default function ChooseStartPage({
  navigation,
}: ChooseStarterPageScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackHeader title="Choose Starter" />
      <View className="flex-1 items-center justify-center">
        <Text>Choose Starter</Text>
      </View>
    </SafeAreaView>
  );
}
