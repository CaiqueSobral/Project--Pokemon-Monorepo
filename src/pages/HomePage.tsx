import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header/Header';
import { NavigationScreensProps } from '../routes/HomeNavigator';
import React, { useContext } from 'react';
import { Pressable, Text, View } from 'react-native';
import { WeatherContext } from '../data/context/weatherContext';

export default function HomePage({ navigation }: NavigationScreensProps) {
  const weatherContext = useContext(WeatherContext);
  return (
    <SafeAreaView className="flex-1 mt-2">
      <Header title="" openDrawer={navigation.openDrawer} />
      <View className="flex-1 justify-center items-center">
        <Text>{`Welcome from`}</Text>
        <Pressable onPress={navigation.openDrawer}>
          <Text>Open Drawer</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
