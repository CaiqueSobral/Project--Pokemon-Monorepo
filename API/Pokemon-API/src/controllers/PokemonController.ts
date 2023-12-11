import { Request, Response } from 'express';
import { db } from '../firebase/db/firebaseDB.ts';
import { PokemonInterface } from '../interfaces/Pokemon.ts';
import { EvolutionChainInterface } from '../interfaces/EvolutionChain.ts';
import { HabitatInterface } from '../interfaces/Habitat.ts';
import { weatherConditions } from '../data/constants.ts';
import { getHabitatWeather } from '../http.ts';

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

export async function getHabitats(_: Request, res: Response) {
  const habitatsRef = db.collection('habitats');
  const habitats = await habitatsRef.get();

  const habitatsArr = await Promise.all(
    habitats.docs.map(async (doc) => {
      const data = doc.data() as HabitatInterface;
      const habitatObj: HabitatInterface = {
        ...data,
        habitatWeather: await getHabitatWeather(data.coords),
      };

      return habitatObj;
    })
  );

  res.status(200).json(habitatsArr.sort((a, b) => a.id - b.id));
}

// TODO REFATORA ESSA MERDA AQUI, ARROMABDO
// export async function getHabitatsTest() {
//   const habitatsArr: Array<HabitatInterface> = [];

//   const habitatsRef = db.collection('habitats');
//   const habitats = await habitatsRef.get();

//   habitats.docs.forEach(async (doc, i) => {
//     habitatsArr.push(doc.data() as HabitatInterface);

//     habitatsArr[i].habitatWeather = await getHabitatWeather(
//       habitatsArr[i].coords
//     );
//   });

//   return habitatsArr;
// }
