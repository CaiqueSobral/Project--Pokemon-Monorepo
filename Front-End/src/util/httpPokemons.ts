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
import { Image } from 'react-native';

const query = `query getPokemonsGen1 {
  evolution_chain: pokemon_v2_evolutionchain(where: {pokemon_v2_pokemonspecies: {pokemon_v2_generation: {id: {_eq: 1}}}}) {
    id
    species: pokemon_v2_pokemonspecies(where: {is_baby: {_eq: false}, pokemon_v2_generation: {id: {_eq: 1}}}) {
      name
      id
    }
  }
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
      data: { evolution_chain, habitats },
    },
  } = await axios.post('https://beta.pokeapi.co/graphql/v1beta', {
    headers: headers,
    query: query,
  });

  arrangePokemonsData();
  arrangeEvolutionData(evolution_chain);
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

function arrangeEvolutionData(evolution_chain: any) {
  type Specie = {
    id: number;
    name: string;
    sprite: string;
  };
  try {
    for (const item in evolution_chain) {
      const evolutionData = evolution_chain[item];
      const evolutionChain: EvolutionChainInterface = {
        id: evolutionData.id,
        species: evolutionData.species
          .map((e: Specie) => {
            return {
              id: e.id,
              name: capitalize(e.name),
              sprite: `https://img.pokemondb.net/sprites/lets-go-pikachu-eevee/normal/${e.name}.png`,
            };
          })
          .sort((a: Specie, b: Specie) => a.id - b.id),
      };
      evolutions.splice(evolutionChain.id, 0, evolutionChain);
    }
  } catch (e) {
    console.log(e);
  }
}
