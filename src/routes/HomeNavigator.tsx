import PokedexPage from '../pages/PokedexPage';
import HomePage from '../pages/HomePage';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

type StackParamList = {
  HomePage: undefined;
  PokedexPage: undefined;
};

export type HomePageScreenProps = NativeStackScreenProps<
  StackParamList,
  'HomePage'
>;

export type PokedexPageScreenProps = NativeStackScreenProps<
  StackParamList,
  'PokedexPage'
>;

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen name="HomePage" component={HomePage}></Stack.Screen>
      <Stack.Screen name="PokedexPage" component={PokedexPage}></Stack.Screen>
    </Stack.Navigator>
  );
}
