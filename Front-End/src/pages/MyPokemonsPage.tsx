import PokemonCard from '../components/Pokedex/PokedexPokemonCard';
import React, { useContext, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PokemonsContext } from '../data/context/pokemonsContext';
import { NavigationScreensProps } from '@/routes/HomeNavigator';
import Header from '../components/Header/Header';
import { UserContext } from '../data/context/userContext';
import { PokemonInterface } from '@/interfaces/Pokemon';

export default function PokedexPage({ navigation }: NavigationScreensProps) {
  const pokemonsContext = useContext(PokemonsContext);
  const { user } = useContext(UserContext);

  const caughtPokemons = pokemonsContext.pokemons
    .filter((pokemon) => user.caughtPokemons.find((e) => e.id === pokemon.id))
    .sort((a, b) => a.id - b.id);

  const verifyPokemon = (item: PokemonInterface) => {
    navigation.navigate('PokemonDexPage', { pokemon: item });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="My Pokémons" />
      <View className="flex-1 items-center mt-2">
        <FlatList
          data={caughtPokemons}
          numColumns={3}
          keyExtractor={(item) => String(item.id)}
          columnWrapperStyle={{ justifyContent: 'space-around' }}
          className="flex-1 w-[95%]"
          renderItem={({ item }) => {
            return (
              <PokemonCard
                name={item.name}
                url={item.sprite}
                status="caught"
                onPress={() => verifyPokemon(item)}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
