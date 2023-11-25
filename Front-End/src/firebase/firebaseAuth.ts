import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { firebaseApp } from './firebaseApp';

const auth = getAuth(firebaseApp);

export async function createUser(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password).catch(
    (e) => {
      throw new Error(e.message);
    },
  );
}

export async function loginUser(email: string, password: string) {
  const { user } = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  ).catch((e) => {
    throw new Error(e.code);
  });

  return user.uid;
}

export async function logOutUser() {
  return await signOut(auth).catch((e) => {
    throw new Error('Internal Error');
  });
}
