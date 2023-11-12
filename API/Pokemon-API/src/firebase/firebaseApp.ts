import { initializeApp, cert } from 'firebase-admin/app';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const firebaseApp = initializeApp({
  credential: cert(require('../../certificate.json')),
});
