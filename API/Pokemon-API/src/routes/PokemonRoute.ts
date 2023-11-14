import { Router } from 'express';
import {
  getAllPokemons,
  getPokemonsEvolutions,
} from '../controllers/PokemonController.ts';

export const pokemonRouter = Router();

pokemonRouter.get('/pokemons', getAllPokemons);
pokemonRouter.get('/evolutions', getPokemonsEvolutions);
