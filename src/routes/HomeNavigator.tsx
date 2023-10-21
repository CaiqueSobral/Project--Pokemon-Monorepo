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
import LoginPage from '../pages/LoginPage';
import { PokemonInterface } from '../interfaces/Pokemon';
import PokemonDexPage from '../pages/PokemonDexPage';
import TravelPage from '../pages/TravelPage';

type StackParamList = {
  LoginPage: undefined;
  HomePage: undefined;
  PokedexPage: undefined;
  PokemonDexPage: { pokemon: PokemonInterface };
  TravelPage: undefined;
};

type DrawerParamList = {
  HomeDrawer: NavigatorScreenParams<StackParamList>;
  PokeDexDrawer: undefined;
  TravelDrawer: undefined;
};

export type LoginPageScreenProps = NativeStackScreenProps<
  StackParamList,
  'LoginPage'
>;

export type HomePageScreenProps = NativeStackScreenProps<
  StackParamList,
  'HomePage'
>;

export type PokedexPageScreenProps = NativeStackScreenProps<
  StackParamList,
  'PokedexPage'
>;

export type PokemonDexPageScreenProps = NativeStackScreenProps<
  StackParamList,
  'PokemonDexPage'
>;

export type TravelPageScreenProps = NativeStackScreenProps<
  StackParamList,
  'TravelPage'
>;

export type NavigationScreensProps = CompositeScreenProps<
  StackScreenProps<StackParamList>,
  DrawerScreenProps<DrawerParamList>
>;

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="HomeDrawer" component={HomePage} />
      <Drawer.Screen
        options={{ title: 'Pokédex', headerTitleStyle: FONTSTART2P }}
        name="PokeDexDrawer"
        component={PokedexPage}
      />
      <Drawer.Screen
        options={{ title: 'Travel', headerTitleStyle: FONTSTART2P }}
        name="TravelDrawer"
        component={TravelPage}
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
      initialRouteName="LoginPage"
    >
      <Stack.Screen name="LoginPage" component={LoginPage}></Stack.Screen>
      <Stack.Screen name="HomePage" component={DrawerNavigator}></Stack.Screen>
      <Stack.Screen name="PokedexPage" component={PokedexPage}></Stack.Screen>
      <Stack.Screen
        name="PokemonDexPage"
        component={PokemonDexPage}
      ></Stack.Screen>
      <Stack.Screen name="TravelPage" component={TravelPage}></Stack.Screen>
    </Stack.Navigator>
  );
}
