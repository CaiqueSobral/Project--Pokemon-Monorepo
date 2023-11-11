import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { firebaseApp } from './firebaseApp';

const storage = getStorage(firebaseApp);

export async function getImage(
  folder: string,
  name: string,
  index: 'Bg' | 'Ground' | 'Main',
  type: string,
): Promise<string> {
  try {
    const image = await getDownloadURL(
      ref(storage, `${folder}/${name + index}.${type}`),
    );
    return image;
  } catch (e) {
    console.log(e);
    return await getDownloadURL(ref(storage, `${name}1.jpeg`));
  }
}
