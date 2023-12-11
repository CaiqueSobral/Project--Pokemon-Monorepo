import {
  EvolutionChainInterface,
  HabitatInterface,
  PokemonInterface,
} from '../interfaces/Pokemon';
import axios from 'axios';

const pokemons: Array<PokemonInterface> = [];
const evolutions: Array<EvolutionChainInterface> = [];
const pokemonsHabitats: Array<HabitatInterface> = [];

export async function getAllPokemons() {
  console.log('Getting Pokemons...');

  const url = process.env.ENV_TEST
    ? 'http://192.168.15.22:3001/api'
    : 'https://project-pokemon-monorepo-production.up.railway.app/api';

  Promise.all([
    arrangePokemonsData(url),
    arrangeEvolutionsData(url),
    arrangeHabitatsData(url),
  ]).catch((e) => {
    throw new Error('Internal server error');
  });

  console.log('Pokemons loaded!');
  console.log(pokemonsHabitats);
  return {
    pokemons: pokemons,
    evolutions: evolutions,
    habitats: pokemonsHabitats,
  };
}

async function arrangePokemonsData(url: string): Promise<void> {
  const { data } = await axios.get(`${url}/pokemons`);

  pokemons.splice(0, pokemons.length, ...data);
}

async function arrangeEvolutionsData(url: string): Promise<void> {
  const { data } = await axios.get(`${url}/evolutions`);

  evolutions.splice(0, evolutions.length, ...data);
}

async function arrangeHabitatsData(url: string): Promise<void> {
  const { data } = await axios.get(`${url}/habitats`);

  pokemonsHabitats.splice(0, pokemonsHabitats.length, ...data);
}
