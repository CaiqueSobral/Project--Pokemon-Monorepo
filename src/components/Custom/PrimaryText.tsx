import { FONTSTART2P } from '../../data/constants';
import { Text } from 'react-native';

type Props = {
  text: string;
  classname?: string;
};
export default function PrimaryText(props: Props) {
  return (
    <Text style={FONTSTART2P} className={` ${props.classname} `}>
      {props.text}
    </Text>
  );
}
