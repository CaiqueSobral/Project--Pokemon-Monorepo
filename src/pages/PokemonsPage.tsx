import { Pokemon } from '../models/Pokemon';
import { getAllPokemons } from '../util/http';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PokemonsPage() {
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
  useEffect(() => {
    async function getPokemons() {
      const allPokemons = await getAllPokemons();
      setPokemons(allPokemons);
    }

    getPokemons();
  }, []);

  return (
    <SafeAreaView className="flex-1 px-2 pt-4">
      <View className="flex-1">
        <FlatList
          data={pokemons}
          numColumns={3}
          keyExtractor={(item) => String(item.id)}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          className="flex-1"
          renderItem={(item) => {
            return (
              <View className="w-[31%] h-44 mb-6 rounded-2xl shadow-md bg-gray-500 shadow-gray-700">
                <View className="flex-[2] m-2 justify-center">
                  <View className="h-[100%] w-auto">
                    <Image
                      style={{ height: undefined, width: undefined }}
                      source={{ uri: item.item.sprite }}
                      className="flex-1"
                    />
                  </View>
                </View>
                <View className="flex-1 justify-center self-center w-[80%] bg-gray-400 rounded-2xl mb-2">
                  <Text className="text-center">{item.item.id}</Text>
                  <Text className="text-center">{item.item.name}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
