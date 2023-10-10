import { FONTSTART2P } from '../../data/constants';
import React from 'react';
import { Image, Text, View } from 'react-native';
import PrimaryText from '../Custom/PrimaryText';

type Props = {
  temp: string;
  city: string;
  day: string;
};
export default function WeatherView(props: Props) {
  return (
    <View className="relative w-[100%] h-[30%] border-4 border-black mb-10 items-center justify-center">
      <View className="h-full w-full bg-white p-2">
        <View className="flex-1 flex-row items-center px-4">
          <View className="flex-1 flex-col">
            <View className="flex-1 pt-[12] justify-center items-center flex-row">
              <PrimaryText classname={'text-5xl'} text={props.temp} />
              <PrimaryText classname={'text-2xl'} text={'°C'} />
            </View>
          </View>
          <View className="flex-1">
            <Image
              source={{
                uri: 'https://piskel-imgstore-b.appspot.com/img/58c5b830-6722-11ee-a8ad-176710959793.gif',
              }}
              resizeMode="contain"
              className="h-[80%] w-[80%] self-center"
            />
          </View>
        </View>
        <View className="w-full items-center justify-center">
          <View className="w-full items-center flex-row justify-center">
            <Image
              source={require('../../../assets/icons/location_icon.png')}
              resizeMode="contain"
              className="h-3 w-3 mr-1"
            />
            <PrimaryText
              classname={'text-sm pt-[8]'}
              text={props.city + ',' + props.day}
            />
          </View>
        </View>
      </View>
      <View className="absolute h-full w-full -z-50">
        <View className="absolute bg-black h-[106%] w-[100%] -z-50 -top-[3%]"></View>
        <View className="absolute bg-black h-[100%] w-[104%] -z-50 -left-[2%]"></View>
      </View>
      <PrimaryText
        classname={'absolute text-sm -top-3 text-center left-4 bg-white px-2'}
        text="Weather"
      />
    </View>
  );
}
