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
import capitalize from '../helpers/helperFunctions';

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
  const {
    data: {
      data: { habitats },
    },
  } = await axios.post('https://beta.pokeapi.co/graphql/v1beta', {
    headers: headers,
    query: query,
  });

  await arrangePokemonsData();
  await arrangeEvolutionsData();
  await arrangeHabitatsData(habitats);

  console.log('Pokemons loaded!');
  return {
    pokemons: pokemons,
    evolutions: evolutions,
    habitats: pokemonsHabitats,
  };
}

async function arrangePokemonsData(): Promise<void> {
  const { data } = await axios.get('http://192.168.15.22:3000/api/pokemons');

  pokemons.push(...data);
}

async function arrangeEvolutionsData(): Promise<void> {
  const { data } = await axios.get('http://192.168.15.22:3000/api/evolutions');

  evolutions.push(...data);
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
