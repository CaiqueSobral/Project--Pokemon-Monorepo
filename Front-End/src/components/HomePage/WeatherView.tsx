import React from 'react';
import { Image, View } from 'react-native';
import PrimaryText from '../Custom/PrimaryText';
import ContainerWithTitle from '../Custom/ContainerRoundedBorders';

type Props = {
  temp: string;
  city: string;
  day: string;
  icon: { uri: string };
};
export default function WeatherView(props: Props) {
  const longCity = props.city.length >= 12;
  return (
    <View className="flex-[3] w-full mt-4">
      <ContainerWithTitle title="Weather">
        <View className="h-full w-full bg-white p-2">
          <View className="flex-1 flex-row items-center px-4">
            <View className="flex-1 flex-col">
              <View className="flex-1 pt-[12] justify-center items-center flex-row">
                <PrimaryText classname={'text-4xl'} text={props.temp} />
                <PrimaryText classname={'text-2xl'} text={'°C'} />
              </View>
            </View>
            <View className="flex-1">
              <Image
                source={props.icon}
                resizeMode="contain"
                className="h-[80%] w-[80%] self-center"
              />
            </View>
          </View>
          <View className="w-full items-center justify-center">
            <View className="w-full items-center flex-row justify-center">
              <View className={`${longCity ? 'flex-col' : 'flex-row'}`}>
                <View className="flex-row">
                  <Image
                    source={require('../../../assets/icons/location_icon.png')}
                    resizeMode="contain"
                    className="h-3 w-3 mr-1"
                  />
                  <PrimaryText
                    classname={`${longCity ? '' : 'pt-[8]'}`}
                    text={props.city + ','}
                  />
                </View>
                <PrimaryText
                  classname={`${longCity ? 'text-center' : 'pt-[8]'}`}
                  text={props.day}
                />
              </View>
            </View>
          </View>
        </View>
      </ContainerWithTitle>
    </View>
  );
}
