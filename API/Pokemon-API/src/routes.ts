import { Router } from 'express';
import { pokemonRouter } from './routes/PokemonRoute.ts';

export const router = Router();

router.use('', pokemonRouter);
