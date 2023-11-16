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
import { HabitatInterface, PokemonInterface } from '../interfaces/Pokemon';
import PokemonDexPage from '../pages/PokemonDexPage';
import TravelPage from '../pages/TravelPage';
import HuntingPage from '../pages/HuntingPage';
import CustomDrawer from '../components/Drawer/CustomDrawer';
import MyPokemonsPage from '../pages/MyPokemonsPage';
import ProfilePage from '../pages/ProfilePage';
import ShopPage from '../pages/ShopPage';
import ConfigPage from '../pages/ConfigPage';

type StackParamList = {
  LoginPage: undefined;
  HomePage: undefined;
  PokedexPage: undefined;
  PokemonDexPage: { pokemon: PokemonInterface };
  TravelPage: undefined;
  HuntingPage: { habitat: HabitatInterface };
};

type DrawerParamList = {
  HomeDrawer: NavigatorScreenParams<StackParamList>;
  PokeDexDrawer: undefined;
  TravelDrawer: undefined;
  MyPokemonsDrawer: undefined;
  ShopDrawer: undefined;
  ProfileDrawer: undefined;
  ConfigDrawer: undefined;
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

export type HuntingPageScreenProps = NativeStackScreenProps<
  StackParamList,
  'HuntingPage'
>;

export type NavigationScreensProps = CompositeScreenProps<
  StackScreenProps<StackParamList>,
  DrawerScreenProps<DrawerParamList>
>;

const Drawer = createDrawerNavigator<DrawerParamList>();

const screens = [
  {
    title: 'Home',
    style: FONTSTART2P,
    name: 'HomeDrawer' as keyof DrawerParamList,
    component: HomePage,
  },
  {
    title: 'Pokédex',
    style: FONTSTART2P,
    name: 'PokeDexDrawer' as keyof DrawerParamList,
    component: PokedexPage,
  },
  {
    title: 'My Pokémons',
    style: FONTSTART2P,
    name: 'MyPokemonsDrawer' as keyof DrawerParamList,
    component: MyPokemonsPage,
  },
  {
    title: 'Travel',
    style: FONTSTART2P,
    name: 'TravelDrawer' as keyof DrawerParamList,
    component: TravelPage,
  },
  {
    title: 'Shop',
    style: FONTSTART2P,
    name: 'ShopDrawer' as keyof DrawerParamList,
    component: ShopPage,
  },
  {
    title: 'Profile',
    style: FONTSTART2P,
    name: 'ProfileDrawer' as keyof DrawerParamList,
    component: ProfilePage,
  },
  {
    title: 'Config',
    style: FONTSTART2P,
    name: 'ConfigDrawer' as keyof DrawerParamList,
    component: ConfigPage,
  },
];

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: [FONTSTART2P, { paddingTop: 8 }],
        drawerItemStyle: { marginLeft: 0, width: '100%' },
      }}
    >
      {screens.map((screen, i) => {
        return (
          <Drawer.Screen
            key={i}
            name={screen.name}
            component={screen.component}
            options={{ title: screen.title, headerTitleStyle: FONTSTART2P }}
          />
        );
      })}
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
      <Stack.Screen
        name="PokemonDexPage"
        component={PokemonDexPage}
      ></Stack.Screen>
      <Stack.Screen name="HuntingPage" component={HuntingPage}></Stack.Screen>
    </Stack.Navigator>
  );
}
