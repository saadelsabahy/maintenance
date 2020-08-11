import ImageCropPicker from 'react-native-image-crop-picker';
import Api from '../../../apis';
import {
   SELECT_CREATE_COMPLAIN_IMAGES,
   RESET_ADD_COMPLAIN_PHOTOS,
   ADD_COMPLAIN_SPINNER,
   ADD_COMPLAIN_SUCCESS,
   ADD_COMPLAIN_FAILED,
} from './types';
import { showFlashMessage } from '../../../utils/flashMessage';
import { WAIT_PERVIEW } from '../../../utils/complainsStutus';
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
export const onAddComplainPressed = (
   { complainDescription, contractor, plateNumber, vehicleNumber, vehicleType },
   resetValues
) => async (dispatch, getState) => {
   const { images } = getState().AddComplain;
   let complainImages;
   if (images.length) {
      complainImages = convertImagesToFormData(images);
      console.log('complainImages', complainImages);
   } else {
      showFlashMessage('danger', 'يجب اختيار صور البلاغ');
   }
   try {
      dispatch({ type: ADD_COMPLAIN_SPINNER });
      let complainBody = {
         Comment: complainDescription,
         VehicleId: vehicleNumber,
         PlateNumber: plateNumber,
         VehicleType: vehicleType,
         ContractorId: contractor,
         StatusId: WAIT_PERVIEW,
         CreatedOn: new Date(),
      };
      const addComplainRequest = await Api.post('Complians/Post', complainBody);
      console.log('addComplainRequest', addComplainRequest);
      if (addComplainRequest.data.statusCode == 200) {
         const { data } = addComplainRequest.data;
         console.log('complainId...', data);
         await Api.post(
            `Complians/UploadImages?ComplianId=${+data}&StatusId=${+WAIT_PERVIEW}`,
            complainImages,
            { headers: { 'Content-Type': 'multipart/form-data' } }
         );
         //upload image here
         resetValues();
         dispatch({ type: ADD_COMPLAIN_SUCCESS });
         showFlashMessage('success', 'تم اضافه البلاغ بنجاح');
      }
   } catch (error) {
      console.log('add complain error', error);
      dispatch({ type: ADD_COMPLAIN_FAILED });
      showFlashMessage(
         'danger',
         'حدث خطأ أثناء انشاء البلاغ برجاء المحاوله مره أخري'
      );
   }
};
export const resetAddcomplainPhotos = () => async dispatch => {
   dispatch({ type: RESET_ADD_COMPLAIN_PHOTOS });
};

export const convertImagesToFormData = images => {
   const form = new FormData();
   images.map(({ mime, path, ...res }, index) => {
      let pathParts = path.split('/');
      form.append('image', {
         uri: Platform.OS == 'android' ? path : path.replace('file://', ''),
         type: mime,
         name:
            Platform.OS == 'android'
               ? pathParts[pathParts.length - 1]
               : res['filename'],
      });
   });
   return form;
};
