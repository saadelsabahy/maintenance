import ImageCropPicker from 'react-native-image-crop-picker';
import {
   SELECT_CREATE_COMPLAIN_IMAGES,
   RESET_ADD_COMPLAIN_PHOTOS,
} from './types';
const options = {
   width: 200,
   height: 200,
   compressImageMaxWidth: 200,
   compressImageMaxHeight: 200,
   cropping: false,
   multiple: true,
   mediaType: 'photo',
};
export const handleOpenCamerapressed = () => (dispatch, getState) => {
   try {
      ImageCropPicker.openCamera(options)
         .then(selectedImages => {
            let selectedPhotos = [];
            selectedPhotos.push(selectedImages);
            dispatch({
               type: SELECT_CREATE_COMPLAIN_IMAGES,
               payload: selectedPhotos,
            });
         })
         .catch(e => {
            console.log('open camera error', e);
         });
   } catch (error) {
      console.log('add complain camera error', error);
   }
};

export const handleOpenGallerypressed = () => (dispatch, getState) => {
   try {
      ImageCropPicker.openPicker(options)
         .then(selectedImages => {
            let selectedPhotos = [];
            selectedPhotos.push(...selectedImages);
            dispatch({
               type: SELECT_CREATE_COMPLAIN_IMAGES,
               payload: selectedPhotos,
            });
         })
         .catch(e => {
            console.log('open camera error', e);
         });
   } catch (error) {
      console.log('add complain camera error', error);
   }
};

export const resetAddcomplainPhotos = () => async dispatch => {
   dispatch({ type: RESET_ADD_COMPLAIN_PHOTOS });
};
