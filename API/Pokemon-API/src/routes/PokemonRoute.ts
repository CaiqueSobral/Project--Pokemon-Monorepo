import { Router } from 'express';
import getAllPokemons from '../controllers/PokemonController.ts';

export const pokemonRouter = Router();

pokemonRouter.get('/pokemons', getAllPokemons);
