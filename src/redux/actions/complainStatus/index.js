import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import { SELECT_EXCUTION_IMAGES } from './types';

export const onAcceptThePreview = ({
   complainNumber,
   complainStatus,
}) => async (dispatch, getState) => {
   const userId = await AsyncStorage.getItem('userId');

   console.warn('accpt preview');
};

export const onRejectThePreview = () => async (dispatch, getState) => {
   const userId = await AsyncStorage.getItem('userId');
   console.warn('reject preview');
};

export const onExcutionDone = () => async (dispatch, getState) => {
   const userId = await AsyncStorage.getItem('userId');
   console.warn('excution done');
   // Complians/UpdateStatus
};

export const selectExcutionPhotos = () => dispatch => {
   ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: false,
      multiple: true,
   })
      .then(seletedImages => {
         const images = [];
         images.push(...seletedImages);
         dispatch({ type: SELECT_EXCUTION_IMAGES, payload: images });
      })
      .catch(e => {
         console.log('image picker error', e);
      });
};
