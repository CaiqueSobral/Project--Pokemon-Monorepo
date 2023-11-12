import { Request, Response } from 'express';
import { db } from '../firebase/db/firebaseDB.ts';
import { PokemonInterface } from '../interfaces/Pokemon.ts';

export default async function getAllPokemons(req: Request, res: Response) {
  const pokemonsArr: Array<PokemonInterface> = [];
  const pokemonsRef = db.collection('pokemons');
  const pokemons = await pokemonsRef.get();
  pokemons.docs.map((doc) => {
    pokemonsArr.push(doc.data() as PokemonInterface);
  });
  res.status(200).json(pokemonsArr.sort((a, b) => a.id - b.id));
}
