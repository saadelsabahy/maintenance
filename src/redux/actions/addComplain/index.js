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
export const onAddComplainPressed = ({
   complainDescription,
   contractor,
   plateNumber,
   vehicleNumber,
   vehicleType,
}) => async (dispatch, getState) => {
   try {
      dispatch({ type: ADD_COMPLAIN_SPINNER });
      let complainBody = {
         Comment: complainDescription,
         VehicleId: vehicleNumber,
         PlateNumber: plateNumber,
         VehicleType: vehicleType,
         ContractorId: contractor,
         StatusId: 1,
      };
      const addComplainRequest = await Api.post('Complians/Post', complainBody);
      console.log('addComplainRequest', addComplainRequest);
      if (addComplainRequest.data.statusCode == 200) {
         //upload image here
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
