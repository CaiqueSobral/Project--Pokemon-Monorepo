import PokemonCard from '../components/Pokedex/PokedexPokemonCard';
import React, { useContext, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PokemonsContext } from '../data/context/pokemonsContext';
import { NavigationScreensProps } from '@/routes/HomeNavigator';
import Header from '../components/Header/Header';
import { UserContext } from '../data/context/userContext';
import { PokemonInterface } from '@/interfaces/Pokemon';
import { UserInterface } from '../interfaces/User';

export default function PokedexPage({ navigation }: NavigationScreensProps) {
  const pokemonsContext = useContext(PokemonsContext);
  const { user } = useContext(UserContext);

  const verifyPokemon = (item: PokemonInterface) => {
    if (user.caughtPokemons.filter((e) => e.id === item.id)[0]) {
      navigation.navigate('PokemonDexPage', { pokemon: item });
    } else {
      return;
    }
  };

  const verifyStatus = (id: number): 'caught' | 'seen' | undefined => {
    const pokemonCaught = user.caughtPokemons.filter((e) => e.id === id)[0];
    const pokemonSeen = user.seenPokemons.filter((e) => e === id)[0];

    if (pokemonCaught) return 'caught';
    if (pokemonSeen) return 'seen';

    return undefined;
  };

  const renderFlatList = () => {
    return (
      <FlatList
        data={pokemonsContext.pokemons}
        numColumns={3}
        keyExtractor={(item) => String(item.id)}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        className="flex-1 w-[95%]"
        renderItem={({ item }) => {
          return (
            <PokemonCard
              name={item.name}
              url={item.sprite}
              status={verifyStatus(item.id)}
              onPress={() => verifyPokemon(item)}
            />
          );
        }}
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Pokédex" />
      <View className="flex-1 items-center mt-2">{renderFlatList()}</View>
    </SafeAreaView>
  );
}
