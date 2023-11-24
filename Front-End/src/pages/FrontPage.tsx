import { FrontPageScreenProps } from '../routes/HomeNavigator';
import { Dimensions, Image, View } from 'react-native';
import PrimaryButton from '../components/Custom/PrimaryButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';
import { Easing } from 'react-native-reanimated';

export default function FrontPage({ navigation }: FrontPageScreenProps) {
  const images = [
    require('../../assets/home/WalkingBottom.gif'),
    require('../../assets/home/pikachuWalking.gif'),
  ];

  return (
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
          <PrimaryButton
            text="Login"
            onPress={() => navigation.navigate('LoginPage')}
          />
        </View>
        <View className="h-[30%] items-center w-full">
          <PrimaryButton
            text="Register"
            onPress={() => navigation.navigate('RegisterPage')}
          />
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
  );
}
