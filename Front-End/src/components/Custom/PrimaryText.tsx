import { FONTSTART2P } from '../../data/constants';
import { StyleProp, Text, TextStyle, View } from 'react-native';

type Props = {
  text: string;
  classname?: string;
  style?: StyleProp<TextStyle>;
};
export default function PrimaryText(props: Props) {
  return (
    <Text style={[FONTSTART2P, props.style]} className={` ${props.classname} `}>
      {props.text}
    </Text>
  );
}
