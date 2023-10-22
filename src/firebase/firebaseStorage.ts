import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { firebaseApp } from './firebaseApp';

const storage = getStorage(firebaseApp);

export async function getImage(name: string, index: number): Promise<string> {
  try {
    const image = await getDownloadURL(ref(storage, `${name + index}.jpeg`));
    return image;
  } catch (e) {
    console.log(e);
    return '';
  }
}
