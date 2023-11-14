import { FONTSTART2P } from '../../data/constants';
import { Text, View } from 'react-native';
import DrawerButton from './DrawerButton';

type Props = {
  title?: string;
};

export default function Header(props: Props) {
  return (
    <View className="h-[5%] w-full mt-2 flex items-center justify-center">
      <DrawerButton />
      <Text className="text-center text-xl pt-2" style={FONTSTART2P}>
        {props.title}
      </Text>
    </View>
  );
}
