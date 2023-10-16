import { FONTSTART2P } from '../../data/constants';
import { NavigationScreensProps } from '@/routes/HomeNavigator';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';
import DrawerButton from './DrawerButton';

type Props = {
  title?: string;
  openDrawer: () => void;
};

export default function Header(props: Props) {
  return (
    <View className="h-[5%] w-full mt-2 flex items-center justify-center">
      <DrawerButton openDrawer={props.openDrawer} />
      <Text className="text-center text-xl pt-2" style={FONTSTART2P}>
        {props.title}
      </Text>
    </View>
  );
}
