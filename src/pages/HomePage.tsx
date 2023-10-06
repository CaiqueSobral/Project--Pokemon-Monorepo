import {
  HomePageScreenProps,
  NavigationScreensProps,
} from '@/routes/HomeNavigator';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function HomePage({ navigation }: NavigationScreensProps) {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>This is the home page</Text>
      <Pressable onPress={navigation.openDrawer}>
        <Text>Open Drawer</Text>
      </Pressable>
    </View>
  );
}
