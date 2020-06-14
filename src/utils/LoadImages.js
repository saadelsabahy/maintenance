import { Image } from 'react-native';
export const loadImages = images => {
   return Promise.all(
      Object.keys(images).map(i => {
         let img = {
            ...Image.resolveAssetSource(images[i]),
            cache: 'force-cache',
         };

         return Image.prefetch(img);
      })
   );
};
