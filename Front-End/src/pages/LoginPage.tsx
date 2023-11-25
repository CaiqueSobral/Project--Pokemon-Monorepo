import { useContext, useState } from 'react';
import { Image, View } from 'react-native';
import { PokemonsContext } from '../data/context/pokemonsContext';
import { WeatherContext } from '../data/context/weatherContext';
import * as Location from 'expo-location';
import PrimaryButton from '../components/Custom/PrimaryButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingModal from '../components/Custom/LoadingModal';
import { LoginPageScreenProps } from '@/routes/HomeNavigator';
import PrimaryTextInput from '../components/Custom/PrimaryTextInput';
import BackHeader from '../components/Header/BackHeader';
import { loginUser } from '../firebase/firebaseAuth';
import CustomModal from '../components/Custom/CustomModal';
import { UserContext } from '../data/context/userContext';

export default function LoginPage({ navigation }: LoginPageScreenProps) {
  const [modalActive, setModalActive] = useState(false);
  const [modalErrorActive, setModalErrorActive] = useState({
    show: false,
    text: '',
  });
  const [loginText, setLoginText] = useState<string>('caiquelsobral@gmail.com');
  const [passText, setPassText] = useState<string>('123456');

  const pokemonContext = useContext(PokemonsContext);
  const weatherContext = useContext(WeatherContext);
  const userContext = useContext(UserContext);

  const tryLogin = async () => {
    try {
      const userId = await loginUser(loginText, passText);
      await getPermissions();
      await userContext.getData(userId);
      await loadApp();
    } catch (e) {
      setModalErrorActive({ show: true, text: '' + e });
      return;
    }
  };

  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission is needed.');
    }
    const permission = status;
    setModalActive(true);
    if (permission) {
      const { coords } = await Location.getCurrentPositionAsync();
      await weatherContext.getWeather([
        coords.latitude || 0,
        coords.longitude || 0,
      ]);
    } else {
      throw new Error('Permission is needed.');
    }
  };

  const loadApp = async () => {
    await pokemonContext.getData();
    setModalActive(false);
    navigation.navigate('HomePage');
  };

  return (
    <>
      {modalActive && <LoadingModal />}
      {modalErrorActive.show && (
        <CustomModal
          text={modalErrorActive.text}
          onPress={() => setModalErrorActive({ show: false, text: '' })}
        />
      )}
      <SafeAreaView className="flex-1 p-4 bg-white">
        <BackHeader />
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
            <PrimaryButton text="Login" onPress={tryLogin} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
