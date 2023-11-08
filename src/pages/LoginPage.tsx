import { useContext, useState } from 'react';
import { LoginPageScreenProps } from '../routes/HomeNavigator';
import { Dimensions, Image, View } from 'react-native';
import { PokemonsContext } from '../data/context/pokemonsContext';
import { WeatherContext } from '../data/context/weatherContext';
import * as Location from 'expo-location';
import PrimaryButton from '../components/Custom/PrimaryButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';
import { Easing } from 'react-native-reanimated';
import LoadingModal from '../components/Custom/LoadingModal';

export default function LoginPage({ navigation }: LoginPageScreenProps) {
  const [modalActive, setModalActive] = useState(false);

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

  const images = [
    require('../../assets/home/WalkingBottom.gif'),
    require('../../assets/home/pikachuWalking.gif'),
  ];

  return (
    <>
      {modalActive && <LoadingModal />}
      <SafeAreaView className="flex-1 p-4 bg-white">
        <View className="flex-1">
          <View className="flex-1">
            <Image
              source={require('../../assets/home/banner-home.png')}
              resizeMode="contain"
              className="h-full w-full"
            />
          </View>
        </View>
        <View className="flex justify-end h-[30%] w-full">
          <View className="h-[30%] items-center w-full">
            <PrimaryButton text="Login" onPress={loadApp} />
          </View>
          <View className="h-[30%] items-center w-full">
            <PrimaryButton text="Register" />
          </View>
          <View className="absolute h-[256] w-full items-center bottom-[60%]">
            <Carousel
              width={Dimensions.get('screen').width}
              data={images}
              autoPlay={true}
              autoPlayReverse={true}
              autoPlayInterval={0}
              pagingEnabled={false}
              snapEnabled={false}
              enabled={false}
              withAnimation={{
                type: 'timing',
                config: {
                  easing: Easing.linear,
                  duration: 6000,
                },
              }}
              renderItem={(item) => {
                return (
                  <View className="h-[256] w-[256]">
                    <Image
                      source={item.item}
                      resizeMode="contain"
                      className="w-full h-full bottom-1"
                    />
                  </View>
                );
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
