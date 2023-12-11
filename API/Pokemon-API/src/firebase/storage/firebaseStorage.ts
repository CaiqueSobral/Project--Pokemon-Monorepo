import { getStorage } from 'firebase-admin/storage';

export const HabitatsBucket = getStorage().bucket();
