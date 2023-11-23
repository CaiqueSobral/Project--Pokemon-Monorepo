import { useContext, useState } from 'react';
import { Image, TextInput, View } from 'react-native';
import { PokemonsContext } from '../data/context/pokemonsContext';
import { WeatherContext } from '../data/context/weatherContext';
import * as Location from 'expo-location';
import PrimaryButton from '../components/Custom/PrimaryButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingModal from '../components/Custom/LoadingModal';
import { LoginPageScreenProps } from '@/routes/HomeNavigator';
import PrimaryTextInput from '../components/Custom/PrimaryTextInput';
import PrimaryText from '../components/Custom/PrimaryText';
import BackButton from '../components/Header/BackButton';

export default function LoginPage({ navigation }: LoginPageScreenProps) {
  const [modalActive, setModalActive] = useState(false);
  const [loginText, setLoginText] = useState<string>('');
  const [passText, setPassText] = useState<string>('');

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
      setModalActive(true);
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
    setModalActive(false);
    navigation.navigate('HomePage');
  };

  return (
    <>
      {modalActive && <LoadingModal />}
      <SafeAreaView className="flex-1 p-4 bg-white">
        <View className="h-[5%] w-[90%] mt-8 justify-center items-center">
          <BackButton navigation={navigation.goBack} />
        </View>
        <View className="flex-1">
          <Image
            source={require('../../assets/home/login-image.png')}
            resizeMode="contain"
            className="h-full w-full"
          />
        </View>
        <View className="flex justify-end items-center h-[30%] w-full space-y-8">
          <View className="w-full space-y-4">
            <View className="w-full h-10 items-center">
              <PrimaryTextInput
                placeholder="Login"
                setText={setLoginText}
                value={loginText}
              />
            </View>
            <View className="w-full h-10 items-center">
              <PrimaryTextInput
                password
                placeholder="Password"
                setText={setPassText}
                value={passText}
              />
            </View>
          </View>
          <View className="h-[30%] items-center w-full">
            <PrimaryButton text="Login" onPress={loadApp} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
