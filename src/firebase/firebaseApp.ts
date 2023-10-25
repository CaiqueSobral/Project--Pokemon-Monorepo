import { FIREBASE_API_KEY } from '@env';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'pokenative-aa1af.firebaseapp.com',
  projectId: 'pokenative-aa1af',
  storageBucket: 'pokenative-aa1af.appspot.com',
  messagingSenderId: '696098320881',
  appId: '1:696098320881:web:2587bc282290af0fca9450',
  measurementId: 'G-Y6NW16MFMT',
};

export const firebaseApp = initializeApp(firebaseConfig);