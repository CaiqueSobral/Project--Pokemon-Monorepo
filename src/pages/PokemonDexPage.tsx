import { PokemonDexPageScreenProps } from '@/routes/HomeNavigator';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PokemonDexPage({ route }: PokemonDexPageScreenProps) {
  const pokemon = route.params.pokemon;

  return (
    <SafeAreaView className="flex-1 p-2">
      <View className="flex-1">
        <View className="flex-1">
          <Image
            height={pokemon.sprite3d.height * 2}
            width={pokemon.sprite3d.width * 2}
            source={{ uri: pokemon.sprite3d.uri }}
          />
        </View>
        <Text>{pokemon.id}</Text>
        <Text>{pokemon.name}</Text>
        <Text>{pokemon.types}</Text>
      </View>
    </SafeAreaView>
  );
}
