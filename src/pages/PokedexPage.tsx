import PokemonCard from '../components/Pokedex/PokedexPokemonCard';
import React, { useContext } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PokemonsContext } from '../data/context/pokemonsContext';
import { NavigationScreensProps } from '@/routes/HomeNavigator';
import Header from '../components/Header/Header';

export default function PokedexPage({ navigation }: NavigationScreensProps) {
  const pokemonsContext = useContext(PokemonsContext);

  if (pokemonsContext.pokemons.length === 0) {
    pokemonsContext.getData();
  }

  return (
    <SafeAreaView className="flex-1 mt-2 bg-white">
      <Header title="Pokédex" openDrawer={navigation.openDrawer} />
      <View className="flex-1 items-center mt-2">
        <FlatList
          data={pokemonsContext.pokemons}
          numColumns={3}
          keyExtractor={(item) => String(item.id)}
          columnWrapperStyle={{ justifyContent: 'space-around' }}
          className="flex-1 w-[95%]"
          renderItem={(item) => {
            return <PokemonCard name={item.item.name} url={item.item.sprite} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
}
