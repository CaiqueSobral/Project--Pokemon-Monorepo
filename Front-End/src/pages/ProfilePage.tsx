import Header from '../components/Header/Header';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfilePage() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Profile" />
      <View className="flex-1 items-center justify-center">
        <Text>My Profile Page</Text>
      </View>
    </SafeAreaView>
  );
}
