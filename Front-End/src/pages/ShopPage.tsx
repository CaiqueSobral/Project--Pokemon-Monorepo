import Header from '../components/Header/Header';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ShopPage() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Shop" />
      <View className="flex-1 items-center justify-center">
        <Text>My Pokemons Page</Text>
      </View>
    </SafeAreaView>
  );
}
