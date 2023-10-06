import { PokemonInterface } from '../interfaces/Pokemon';
import PokemonCard from '../components/Pokedex/PokedexPokemonCard';
import React, { useContext, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PokemonsContext } from '../data/context/pokemonsContext';

export default function PokemonsPage() {
  const pokemons = [] as Array<PokemonInterface>;
  const pokemonsContext = useContext(PokemonsContext);

  if (!pokemonsContext.pokemons.length) {
    pokemonsContext.getData();
    pokemons.push(...pokemonsContext.pokemons);
  } else {
    pokemons.push(...pokemonsContext.pokemons);
  }

  return (
    <SafeAreaView className="flex-1 px-2">
      <View className="flex-1 items-center">
        <FlatList
          data={pokemons}
          numColumns={3}
          keyExtractor={(item) => String(item.id)}
          columnWrapperStyle={{ justifyContent: 'space-around' }}
          className="flex-1 pt-4 w-[95%]"
          renderItem={(item) => {
            return <PokemonCard name={item.item.name} url={item.item.sprite} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
}
