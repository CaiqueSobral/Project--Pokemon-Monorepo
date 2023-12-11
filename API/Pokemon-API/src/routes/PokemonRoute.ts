import { Router } from 'express';
import {
  getAllPokemons,
  getHabitats,
  getPokemonsEvolutions,
} from '../controllers/PokemonController.ts';

export const pokemonRouter = Router();

pokemonRouter.get('/pokemons', getAllPokemons);
pokemonRouter.get('/evolutions', getPokemonsEvolutions);
pokemonRouter.get('/habitats', getHabitats);
