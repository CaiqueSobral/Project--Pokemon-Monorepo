import { Pokemon } from '../models/Pokemon';
import axios from 'axios';

export async function getAllPokemons() {
  const response = await axios.get('https://pokeapi.co/api/v2/generation/1');
  const pokemons: Array<Pokemon> = [];

  try {
    for (const item in response.data.pokemon_species) {
      const pokemonData = await getPokemon(
        response.data.pokemon_species[item].url,
      );
      const pokemon = new Pokemon(
        pokemonData.id,
        pokemonData.name,
        `https://img.pokemondb.net/sprites/lets-go-pikachu-eevee/normal/${pokemonData.name}.png`,
        pokemonData.types,
      );
      pokemons.push(pokemon);
    }
  } catch (e) {
    console.log(e);
  }

  return pokemons.sort((a, b) => a.id - b.id);
}

async function getPokemon(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
