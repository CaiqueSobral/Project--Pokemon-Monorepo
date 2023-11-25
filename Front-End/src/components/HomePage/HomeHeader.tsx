import React, { useContext } from 'react';
import { Image, View } from 'react-native';
import PrimaryText from '../Custom/PrimaryText';
import { UserContext } from '../../data/context/userContext';

export default function HomeHeader() {
  const { user } = useContext(UserContext);
  return (
    <View className="flex-1 w-full flex-row items-center mt-4 mb-4">
      <View className="flex-1 justify-center items-start pt-[10]">
        <PrimaryText
          classname={'text-xl'}
          text={`Welcome back, ${user.name}`}
        />
      </View>
      <View className="flex h-20 w-20 justify-center items-center rounded-full border border-black">
        <Image
          source={require('../../../assets/images/profile/male_pic.png')}
          resizeMode="contain"
          className="w-full h-full rounded-full"
        />
      </View>
    </View>
  );
}
