import PokemonCard from '../components/Pokedex/PokedexPokemonCard';
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
    <SafeAreaView className="flex-1 px-2">
      <View className="flex-1">
        <FlatList
          data={pokemons}
          numColumns={2}
          keyExtractor={(item) => String(item.id)}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          className="flex-1 pt-4"
          renderItem={(item) => {
            return (
              <PokemonCard
                id={item.item.id}
                name={item.item.name}
                url={item.item.sprite}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
