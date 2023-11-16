import {
  EvolutionChainInterface,
  HabitatInterface,
  PokemonInterface,
} from '../interfaces/Pokemon';
import axios from 'axios';
import { getImage } from '../firebase/firebaseStorage';
import { getWeatherData } from './httpWeather';
import { WeatherInterface } from '../interfaces/Weather';
import { habitatsLocations } from '../data/constants';

const query = `query getPokemonsGen1 {
  habitats: pokemon_v2_pokemonhabitat(where: {pokemon_v2_pokemonspecies: {pokemon_v2_generation: {id: {_eq: 1}}}}) {
    name
    id
  }
}`;

const headers = {
  'content-type': 'application/json',
  'X-Method-Used': 'graphiql',
};

const pokemons: Array<PokemonInterface> = [];
const evolutions: Array<EvolutionChainInterface> = [];
const pokemonsHabitats: Array<HabitatInterface> = [];

export async function getAllPokemons() {
  console.log('Getting Pokemons...');

  const url = 'http://192.168.15.22:3000/api';

  const {
    data: {
      data: { habitats },
    },
  } = await axios.post('https://beta.pokeapi.co/graphql/v1beta', {
    headers: headers,
    query: query,
  });

  Promise.all([
    arrangePokemonsData(url),
    arrangeEvolutionsData(url),
    arrangeHabitatsData(habitats),
  ]).catch((e) => {
    throw new Error('Internal server error\n' + e);
  });

  console.log('Pokemons loaded!');
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

async function arrangeHabitatsData(habitatsData: any) {
  try {
    for (const item in habitatsData) {
      const habitatData = habitatsData[item];

      if (habitatData.name == 'rare') continue;

      const habitat: HabitatInterface = {
        name: habitatData.name,
        sprite: {
          main: await getImage('Habitats', habitatData.name, 'Main', 'jpg'),
          bg: await getImage('Habitats', habitatData.name, 'Bg', 'jpg'),
          ground: await getImage('Habitats', habitatData.name, 'Ground', 'png'),
        },
        id: pokemonsHabitats.length,
        habitatWeather: await getHabitatWeather(habitatData.name),
      };

      pokemonsHabitats.splice(habitat.id, 0, habitat);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getHabitatWeather(
  name: keyof typeof habitatsLocations,
): Promise<WeatherInterface> {
  return await getWeatherData(habitatsLocations[name]);
}
