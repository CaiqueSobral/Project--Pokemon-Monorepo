import {
  EvolutionChainInterface,
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
    }
  }
  evolution_chain: pokemon_v2_evolutionchain(where: {pokemon_v2_pokemonspecies: {pokemon_v2_generation: {id: {_eq: 1}}}}) {
    id
    species: pokemon_v2_pokemonspecies(where: {is_baby: {_eq: false}, pokemon_v2_generation: {id: {_eq: 1}}}) {
      name
      id
    }
  }
}`;

const headers = {
  'content-type': 'application/json',
  'X-Method-Used': 'graphiql',
};

const pokemons: Array<PokemonInterface> = [];
const evolutions: Array<EvolutionChainInterface> = [];

export async function getAllPokemons() {
  console.info('Getting Pokemons...');
  const {
    data: {
      data: { gen_1, evolution_chain },
    },
  } = await axios.post('https://beta.pokeapi.co/graphql/v1beta', {
    headers: headers,
    query: query,
  });

  arrangePokemonData(gen_1);
  arrangeEvolutionData(evolution_chain);

  console.info('Pokemons loaded...');
  return {
    pokemons: pokemons,
    evolutions: evolutions,
  };
}

function arrangeEvolutionData(evolution_chain: any) {
  try {
    for (const item in evolution_chain) {
      const evolutionData = evolution_chain[item];

      const evolutionChain: EvolutionChainInterface = {
        id: evolutionData.id,
        species: evolutionData.species,
      };
      evolutions.push(evolutionChain);
    }
  } catch (e) {
    console.log(e);
  }
}

function arrangePokemonData(gen_1: any) {
  try {
    for (const item in gen_1[0].pokemons) {
      const pokemonData = gen_1[0].pokemons[item];

      const pokemon: PokemonInterface = {
        id: pokemonData.id,
        name:
          pokemonData.pokemon[0].name.charAt(0).toUpperCase() +
          pokemonData.pokemon[0].name
            .slice(1)
            .replace('n-f', 'n ♀')
            .replace('n-m', 'n ♂'),
        height: pokemonData.pokemon[0].height * 10,
        weight: pokemonData.pokemon[0].weight / 10,
        sprite: `https://img.pokemondb.net/sprites/lets-go-pikachu-eevee/normal/${pokemonData.pokemon[0].name}.png`,
        sprite3d: `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemonData.pokemon[0].name}.gif`,
        captureRate: pokemonData.pokemon[0].capture_rate,
        evolutionChainId: pokemonData.pokemon[0].evolution_chain_id,
        types: pokemonData.pokemon[0].types.map(
          (e: { type: { name: string } }) => e.type.name,
        ),
      };
      pokemons.push(pokemon);
    }
  } catch (e) {
    console.log(e);
  }
}
