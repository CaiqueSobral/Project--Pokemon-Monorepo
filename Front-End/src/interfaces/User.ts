export interface UserInterface {
  id: string;
  name: string;
  email: string;
  char: 'male' | 'female';
  wallet: number;
  seenPokemons: Array<number>;
  caughtPokemons: Array<{ id: number; qtd: number }>;
  items: Array<number>;
}
