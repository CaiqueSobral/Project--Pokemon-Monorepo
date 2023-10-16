import { Image } from 'react-native';
import {
  EvolutionChainInterface,
  HabitatInterface,
  PokemonInterface,
} from '../interfaces/Pokemon';
import axios from 'axios';

const query = `query getPokemonsGen1 {
  gen_1: pokemon_v2_generation(where: {id: {_eq: 1}}) {
    pokemons: pokemon_v2_pokemonspecies(order_by: {id: asc}) {
      id
      pokemon: pokemon_v2_pokemons(where: {is_default: {_eq: true}}) {
        name
        weight
        height
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
      }
      capture_rate
      evolution_chain_id
      habitat: pokemon_v2_pokemonhabitat {
        name
      }
    }
  }
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
const habitats: Array<HabitatInterface> = [];

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function getAllPokemons() {
  console.log('Getting Pokemons...');
  const {
    data: {
      data: { gen_1, evolution_chain, habitats },
    },
  } = await axios.post('https://beta.pokeapi.co/graphql/v1beta', {
    headers: headers,
    query: query,
  });

  await arrangePokemonData(gen_1);
  arrangeEvolutionData(evolution_chain);
  arrangeHabitatsData(habitats);

  console.log('Pokemons loaded!');
  return {
    pokemons: pokemons,
    evolutions: evolutions,
    habitats: habitats,
  };
}

function arrangeHabitatsData(habitatsData: any) {
  try {
    for (const item in habitatsData) {
      const habitatData = habitatsData[item];

      const habitat: HabitatInterface = {
        name: habitatData.name,
        id: habitatData.id,
      };

      habitats.push(habitat);
    }
  } catch (error) {
    console.log(error);
  }
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
      evolutions.push(evolutionChain);
    }
  } catch (e) {
    console.log(e);
  }
}

async function arrangePokemonData(gen_1: any) {
  try {
    for (const item in gen_1[0].pokemons) {
      const pokemonData = gen_1[0].pokemons[item];

      const pokemon: PokemonInterface = {
        id: pokemonData.id,
        name: capitalize(pokemonData.pokemon[0].name)
          .replace('n-f', 'n ♀')
          .replace('n-m', 'n ♂'),
        height: pokemonData.pokemon[0].height * 10,
        weight: pokemonData.pokemon[0].weight / 10,
        sprite: `https://img.pokemondb.net/sprites/lets-go-pikachu-eevee/normal/${pokemonData.pokemon[0].name}.png`,
        sprite3d: {
          uri: `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemonData.pokemon[0].name}.gif`,
          height: 0,
          width: 0,
        },
        captureRate: pokemonData.capture_rate,
        evolutionChainId: pokemonData.evolution_chain_id,
        habitat: capitalize(pokemonData.habitat.name),
        types: pokemonData.pokemon[0].types.map(
          (e: { type: { name: string } }) => e.type.name,
        ),
      };
      await Image.getSize(
        `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemonData.pokemon[0].name}.gif`,
        (w, h) => {
          pokemon.sprite3d.width = w;
          pokemon.sprite3d.height = h;
        },
      );
      pokemons.push(pokemon);
    }
  } catch (e) {
    console.log(e);
  }
}
