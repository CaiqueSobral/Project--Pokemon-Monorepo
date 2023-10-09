import { useContext } from 'react';
import { LoginPageScreenProps } from '../routes/HomeNavigator';
import { Pressable, Text, View } from 'react-native';
import { PokemonsContext } from '../data/context/pokemonsContext';
import { WeatherContext } from '../data/context/weatherContext';
import * as Location from 'expo-location';

export default function LoginPage({ navigation }: LoginPageScreenProps) {
  const pokemonContext = useContext(PokemonsContext);
  const weatherContext = useContext(WeatherContext);

  const loadApp = async () => {
    const getPermissions = async (): Promise<boolean> => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.error('Permission not granted.');
        return false;
      }
      return true;
    };

    const getLocation = async () => {
      const permission = await getPermissions();

      if (permission) {
        const { coords } = await Location.getCurrentPositionAsync();
        await weatherContext.getWeather([
          coords.latitude || 0,
          coords.longitude || 0,
        ]);
      }
    };
    await getLocation();
    await pokemonContext.getData();

    navigation.navigate('HomePage');
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Login Page</Text>
      <Pressable className="h-28 w-48 bg-blue-500" onPress={() => loadApp()}>
        <Text className="text-5xl">Login</Text>
      </Pressable>
    </View>
  );
}
