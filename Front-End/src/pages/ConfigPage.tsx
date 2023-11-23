import Header from '../components/Header/Header';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConfigPage() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Config" />
      <View className="flex-1 items-center justify-center">
        <Text>Config Page</Text>
      </View>
    </SafeAreaView>
  );
}
