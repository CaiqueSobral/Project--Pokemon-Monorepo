import { getFirestore } from 'firebase-admin/firestore';
import { firebaseApp } from '../firebaseApp.ts';

export const db = getFirestore(firebaseApp);
