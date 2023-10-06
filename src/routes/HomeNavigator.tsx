import PokedexPage from '../pages/PokedexPage';
import HomePage from '../pages/HomePage';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import {
  DrawerScreenProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { FONTSTART2P } from '../data/constants';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

type StackParamList = {
  HomePage: undefined;
  PokedexPage: undefined;
};

type DrawerParamList = {
  HomeDrawer: NavigatorScreenParams<StackParamList>;
  PokeDexDrawer: undefined;
};

export type NavigationScreensProps = CompositeScreenProps<
  StackScreenProps<StackParamList>,
  DrawerScreenProps<DrawerParamList>
>;

export type HomePageScreenProps = NativeStackScreenProps<
  StackParamList,
  'HomePage'
>;

export type PokedexPageScreenProps = NativeStackScreenProps<
  StackParamList,
  'PokedexPage'
>;

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeDrawer"
    >
      <Drawer.Screen name="HomeDrawer" component={HomePage} />
      <Drawer.Screen
        options={{ title: 'Pokédex', headerTitleStyle: FONTSTART2P }}
        name="PokeDexDrawer"
        component={PokedexPage}
      />
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator<StackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="HomePage" component={DrawerNavigator}></Stack.Screen>
      <Stack.Screen name="PokedexPage" component={PokedexPage}></Stack.Screen>
    </Stack.Navigator>
  );
}
