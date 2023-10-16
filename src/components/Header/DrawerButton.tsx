import { Image, Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Custom8BitBorders from '../Custom/Custom8BitBorders';

type Props = {
  openDrawer: () => void;
};

export default function DrawerButton(props: Props) {
  const bgActive = useSharedValue(0);

  const rightShadowAnim = useAnimatedStyle(() => {
    return {
      right: bgActive.value === 0 ? 0 : 26,
    };
  });

  const bottomShadowAnim = useAnimatedStyle(() => {
    return {
      bottom: bgActive.value === 0 ? 0 : 26,
    };
  });

  return (
    <Pressable
      className="absolute justify-self-center left-[5%]"
      onPress={props.openDrawer}
      onPressIn={() => (bgActive.value = 1)}
      onPressOut={() => (bgActive.value = 0)}
    >
      <View className="h-7 w-7 bg-blue-500">
        <View className="self-center justify-self-center pt-[3px] pl-[3px] pr-[4px] pb-[4px]">
          <Image
            source={require('../../../assets/icons/drawer-icon.png')}
            resizeMode="contain"
            className="w-auto h-full"
          />
        </View>
      </View>
      <Custom8BitBorders />
      <Animated.View
        style={rightShadowAnim}
        className="absolute h-full w-[3px] right-0 bg-blue-700"
      ></Animated.View>
      <Animated.View
        style={bottomShadowAnim}
        className="absolute w-full h-[3px] bottom-0 bg-blue-700"
      ></Animated.View>
    </Pressable>
  );
}
