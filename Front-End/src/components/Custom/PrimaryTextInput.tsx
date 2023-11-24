import React from 'react';
import { TextInput, View } from 'react-native';
import Custom8BitBorders from './Custom8BitBorders';
import { FONTSTART2P } from '../../data/constants';

type Props = {
  password?: true;
  placeholder?: string | undefined;
  setText: React.Dispatch<React.SetStateAction<string>>;
  value: string;
};

export default function PrimaryTextInput(props: Props) {
  const setText = (text: string) => {
    props.setText(text);
  };

  return (
    <View className="w-11/12 h-10 justify-center self-center bg-white">
      <TextInput
        secureTextEntry={props.password}
        style={[FONTSTART2P]}
        className="text-xs pt-[8] px-4"
        placeholder={props.placeholder}
        selectionColor={'#1d4ed8'}
        onChangeText={setText}
        value={props.value}
      />
      <Custom8BitBorders />
    </View>
  );
}
