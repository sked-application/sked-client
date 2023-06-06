import { firebaseApp } from '../../services/firebase.service';
import { getUnixHash } from './date';
import { resizeFile } from './image';

export const uploadFile = async (file, dataId) => {
  const image = await resizeFile(file);
  const storageRef = firebaseApp.storage().ref('thumbnails');
  const fileRef = storageRef.child(`${dataId}-${getUnixHash()}-${image.name}`);

  await fileRef.put(image);
  return fileRef.getDownloadURL();
};
