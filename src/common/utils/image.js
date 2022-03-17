import Resizer from 'react-image-file-resizer';

export const resizeFile = (file) => {
  return new Promise((resolve, reject) => {
    try {
      Resizer.imageFileResizer(
        file,
        170,
        170,
        'PNG',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'file',
      );
    } catch (error) {
      reject(error);
    }
  });
};
