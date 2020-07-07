import ImageCropPicker from 'react-native-image-crop-picker';
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
         .then(selectedImages => console.log(selectedImages))
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
         .then(selectedImages => console.log(selectedImages))
         .catch(e => {
            console.log('open camera error', e);
         });
   } catch (error) {
      console.log('add complain camera error', error);
   }
};
