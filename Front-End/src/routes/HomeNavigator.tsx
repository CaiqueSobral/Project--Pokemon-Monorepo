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
import FrontPage from '../pages/FrontPage';
import { HabitatInterface, PokemonInterface } from '../interfaces/Pokemon';
import PokemonDexPage from '../pages/PokemonDexPage';
import TravelPage from '../pages/TravelPage';
import HuntingPage from '../pages/HuntingPage';
import CustomDrawer from '../components/Drawer/CustomDrawer';
import MyPokemonsPage from '../pages/MyPokemonsPage';
import ProfilePage from '../pages/ProfilePage';
import ShopPage from '../pages/ShopPage';
import ConfigPage from '../pages/ConfigPage';
import { Image } from 'react-native';
import PrimaryText from '../components/Custom/PrimaryText';
import MyBagPage from '../pages/MyBagPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ChooseStartPage from '../pages/ChooseStarterPage';

type StackParamList = {
  FrontPage: undefined;
  LoginPage: undefined;
  RegisterPage: undefined;
  ChooseStarterPage: undefined;
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
  MyBagDrawer: undefined;
  ShopDrawer: undefined;
  ProfileDrawer: undefined;
  ConfigDrawer: undefined;
};

export type FrontPageScreenProps = NativeStackScreenProps<
  StackParamList,
  'FrontPage'
>;

export type LoginPageScreenProps = NativeStackScreenProps<
  StackParamList,
  'LoginPage'
>;

export type RegisterPageScreenProps = NativeStackScreenProps<
  StackParamList,
  'RegisterPage'
>;

export type ChooseStarterPageScreenProps = NativeStackScreenProps<
  StackParamList,
  'ChooseStarterPage'
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
    icon: require('../../assets/icons/drawer/home-icon.png'),
  },
  {
    title: 'Pokédex',
    style: FONTSTART2P,
    name: 'PokeDexDrawer' as keyof DrawerParamList,
    component: PokedexPage,
    icon: require('../../assets/icons/drawer/pokedex-icon.png'),
  },
  {
    title: 'My Pokémons',
    style: FONTSTART2P,
    name: 'MyPokemonsDrawer' as keyof DrawerParamList,
    component: MyPokemonsPage,
    icon: require('../../assets/icons/drawer/pokeball-icon.png'),
  },
  {
    title: 'My Bag',
    style: FONTSTART2P,
    name: 'MyBagDrawer' as keyof DrawerParamList,
    component: MyBagPage,
    icon: require('../../assets/icons/drawer/bag-icon.png'),
  },
  {
    title: 'Travel',
    style: FONTSTART2P,
    name: 'TravelDrawer' as keyof DrawerParamList,
    component: TravelPage,
    icon: require('../../assets/icons/drawer/sign-icon.png'),
  },
  {
    title: 'Shop',
    style: FONTSTART2P,
    name: 'ShopDrawer' as keyof DrawerParamList,
    component: ShopPage,
    icon: require('../../assets/icons/drawer/shop-icon.png'),
  },
  {
    title: 'Profile',
    style: FONTSTART2P,
    name: 'ProfileDrawer' as keyof DrawerParamList,
    component: ProfilePage,
    icon: require('../../assets/icons/drawer/profile-icon.png'),
  },
  {
    title: 'Config',
    style: FONTSTART2P,
    name: 'ConfigDrawer' as keyof DrawerParamList,
    component: ConfigPage,
    icon: require('../../assets/icons/drawer/config-icon.png'),
  },
];

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          borderColor: 'black',
          borderRightWidth: 4,
          borderBottomWidth: 4,
          borderTopWidth: 4,
        },
        drawerLabelStyle: [FONTSTART2P],
        drawerItemStyle: { marginLeft: 0, width: '100%' },
      }}
    >
      {screens.map((screen, i) => {
        return (
          <Drawer.Screen
            key={i}
            name={screen.name}
            component={screen.component}
            options={{
              title: screen.title,
              headerTitleStyle: FONTSTART2P,
              drawerIcon: ({ focused }) => {
                return (
                  <Image
                    source={screen.icon}
                    style={[
                      focused ? {} : { opacity: 0.5 },
                      { height: 32, width: 32 },
                    ]}
                    resizeMode="contain"
                    className="-mr-[24]"
                  />
                );
              },
              drawerLabel: ({ focused }) => {
                return (
                  <PrimaryText
                    text={screen.title}
                    style={[focused ? {} : { opacity: 0.5 }]}
                    classname={`pt-[8]`}
                  />
                );
              },
            }}
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
      initialRouteName="FrontPage"
    >
      <Stack.Screen name="FrontPage" component={FrontPage}></Stack.Screen>
      <Stack.Screen name="LoginPage" component={LoginPage}></Stack.Screen>
      <Stack.Screen name="RegisterPage" component={RegisterPage}></Stack.Screen>
      <Stack.Screen
        name="ChooseStarterPage"
        component={ChooseStartPage}
      ></Stack.Screen>
      <Stack.Screen name="HomePage" component={DrawerNavigator}></Stack.Screen>
      <Stack.Screen
        name="PokemonDexPage"
        component={PokemonDexPage}
      ></Stack.Screen>
      <Stack.Screen name="HuntingPage" component={HuntingPage}></Stack.Screen>
    </Stack.Navigator>
  );
}
