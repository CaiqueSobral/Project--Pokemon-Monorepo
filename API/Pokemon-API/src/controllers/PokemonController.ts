import { Request, Response } from 'express';
import { db } from '../firebase/db/firebaseDB.ts';
import { PokemonInterface } from '../interfaces/Pokemon.ts';
import { EvolutionChainInterface } from '../interfaces/EvolutionChain.ts';

export async function getAllPokemons(_: Request, res: Response) {
  const pokemonsArr: Array<PokemonInterface> = [];

  const pokemonsRef = db.collection('pokemons');
  const pokemons = await pokemonsRef.get();

  pokemons.docs.forEach((doc) => {
    pokemonsArr.push(doc.data() as PokemonInterface);
  });

  res.status(200).json(pokemonsArr.sort((a, b) => a.id - b.id));
}

export async function getPokemonsEvolutions(_: Request, res: Response) {
  const evolutionsArr: Array<EvolutionChainInterface> = [];

  const evolutionsRef = db.collection('evolutions');
  const evolutions = await evolutionsRef.get();

  evolutions.docs.forEach((doc) => {
    evolutionsArr.push(doc.data() as EvolutionChainInterface);
  });

  res.status(200).json(evolutionsArr.sort((a, b) => a.id - b.id));
}
