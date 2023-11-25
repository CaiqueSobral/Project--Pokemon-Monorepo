import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { firebaseApp } from './firebaseApp';
import { UserInterface } from '../interfaces/User';

const firestore = getFirestore(firebaseApp);

export async function createUserStore(
  id: string,
  name: string,
  email: string,
  char: 'male' | 'female',
) {
  const user = {
    id: id,
    name: name,
    email: email,
    char: char,
    wallet: 1000,
    caughtPokemons: [],
    seenPokemons: [],
    items: [],
  } as UserInterface;

  await setDoc(doc(firestore, 'users', id), user);
}

export async function getUserData(id: string) {
  const docRef = doc(firestore, 'users', id);
  const user = await getDoc(docRef);

  if (user.exists()) {
    return user.data() as UserInterface;
  } else {
    throw new Error('User not found');
  }
}

export async function addCaughtPokemon(
  user: UserInterface,
  newPokemonId: number,
) {
  const userRef = doc(firestore, 'users', user.id);

  const pokemon = user.caughtPokemons.filter((e) => e.id === newPokemonId)[0];

  if (pokemon) {
    const pokemonIndex = user.caughtPokemons.findIndex(
      (e) => e.id === pokemon.id,
    );
    user.caughtPokemons[pokemonIndex] = {
      id: pokemon.id,
      qtd: pokemon.qtd + 1,
    };
  } else {
    user.caughtPokemons.push({ id: newPokemonId, qtd: 1 });
  }

  await updateDoc(userRef, {
    caughtPokemons: user.caughtPokemons,
    wallet: user.wallet + 100,
  });
}

export async function addSeenPokemon(
  user: UserInterface,
  newPokemonId: number,
) {
  const userRef = doc(firestore, 'users', user.id);

  const pokemon = user.seenPokemons.filter((e) => e === newPokemonId)[0];
  if (pokemon) {
    return;
  } else {
    user.seenPokemons.push(newPokemonId);
  }

  await updateDoc(userRef, {
    seenPokemons: user.seenPokemons,
  });
}
