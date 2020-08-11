import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import {
   SELECT_EXCUTION_IMAGES,
   APPROVE_FAILED,
   APPROVE_SPINNER,
   REJECT_SPINNER,
   REJECT_FAILED,
   APPROVE_SUCCESS,
   REJECT_SUCCESS,
   EXCUTION_SPINNER,
   EXCUTION_SUCCESS,
   EXCUTION_FAILED,
   CLOSE_EXCUTION_BOTTOM_SHEET,
   SAVE_SIGNATURE,
   DELETE_IMAGE_PATH,
} from './types';
import { showFlashMessage } from '../../../utils/flashMessage';
import Reactotron from 'reactotron-react-native';
import Api from '../../../apis';
import { Platform } from 'react-native';
import { convertImagesToFormData } from '../addComplain';
import {
   WAIT_EXCUTION,
   REJECTED,
   SOLVED,
} from '../../../utils/complainsStutus';
export const onAcceptThePreview = (
   { complainNumber, covered },
   navigation
) => async (dispatch, getState) => {
   try {
      dispatch({ type: APPROVE_SPINNER });
      const userId = await AsyncStorage.getItem('userId');
      console.log('upload sig data...', complainNumber, userId);
      const { signature } = getState().UpdateComplainsStatus;
      const signatureImage = new FormData();
      [signature].map(img => {
         signatureImage.append('image', {
            uri: Platform.OS == 'android' ? img : img.replace('file://', ''),
            type: 'image/png',
            name: userId + 'signature.png',
         });
      });

      await Api.post(
         `Complians/Signature/UploadImage/${+complainNumber}/${userId}`,
         signatureImage,
         { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      const approvalResponse = await Api.post(
         `Complians/UpdateStatus?StatusId=${+WAIT_EXCUTION}&UserId=${userId}&ComplianId=${+complainNumber}&IsInWarranty=${covered}&Comment=${null}`,
         []
      );
      Reactotron.log(approvalResponse);
      if (approvalResponse.data.statusCode == 200) {
         await dispatch({ type: APPROVE_SUCCESS });
         navigation.goBack();
      }
   } catch (error) {
      dispatch({ type: APPROVE_FAILED });
      console.log('approval error', error);
      showFlashMessage('danger', 'حدث خطأ برجاء المحاوله مره اخري');
   }
};

export const onRejectThePreview = (
   { complainNumber, covered },
   navigation
) => async (dispatch, getState) => {
   const userId = await AsyncStorage.getItem('userId');
   try {
      dispatch({ type: REJECT_SPINNER });
      const rejectResponse = await Api.post(
         `Complians/UpdateStatus?StatusId=${REJECTED}&UserId=${userId}&ComplianId=${+complainNumber}&IsInWarranty=${covered}&Comment=${null}`,
         []
      );
      if (rejectResponse.data.statusCode == 200) {
         await dispatch({ type: REJECT_SUCCESS });
         navigation.goBack();
      }
   } catch (error) {
      dispatch({ type: REJECT_FAILED });
      console.log('approval error', error);
      showFlashMessage('danger', 'حدث خطأ برجاء المحاوله مره اخري');
   }
};

export const onExcutionDone = (
   { complainNumber, covered, complainStatus },
   navigation
) => async (dispatch, getState) => {
   const userId = await AsyncStorage.getItem('userId');
   const { images } = getState().UpdateComplainsStatus;

   if (images.length < 1) {
      showFlashMessage('danger', 'يجب اضافه صوره لما تم اصلاحه');
   } else {
      try {
         dispatch({ type: EXCUTION_SPINNER });
         const form = new FormData();
         images.map(({ mime, path, ...res }, index) => {
            let pathParts = path.split('/');
            form.append('image', {
               uri:
                  Platform.OS == 'android' ? path : path.replace('file://', ''),
               type: mime,
               name:
                  Platform.OS == 'android'
                     ? pathParts[pathParts.length - 1]
                     : res['filename'],
            });
         });
         await Api.post(
            `Complians/UploadImages?ComplianId=${+complainNumber}&StatusId=${SOLVED}`,
            form,
            { headers: { 'Content-Type': 'multipart/form-data' } }
         );

         const rejectResponse = await Api.post(
            `Complians/UpdateStatus?StatusId=${SOLVED}&UserId=${userId}&ComplianId=${+complainNumber}&IsInWarranty=${covered}&Comment=${null}`,
            []
         );
         if (rejectResponse.data.statusCode == 200) {
            await dispatch({ type: EXCUTION_SUCCESS });
            navigation.goBack();
         }
      } catch (error) {
         dispatch({ type: EXCUTION_FAILED });
         console.log('excution error', error);
         showFlashMessage('danger', 'حدث خطأ برجاء المحاوله مره اخري');
      }
   }
   // Complians/UpdateStatus
};

export const selectExcutionPhotos = type => (dispatch, getState) => {
   const { images } = getState().UpdateComplainsStatus;
   const options = {
      width: 200,
      height: 200,
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      cropping: false,
      multiple: true,
      mediaType: 'photo',
   };

   if (type == 'camera') {
      ImagePicker.openCamera(options)
         .then(seletedImages => {
            dispatch({
               type: SELECT_EXCUTION_IMAGES,
               payload: [...images, seletedImages],
            });
         })
         .catch(e => {
            console.log('image picker camera error', e);
         });
   } else {
      ImagePicker.openPicker(options)
         .then(seletedImages => {
            dispatch({
               type: SELECT_EXCUTION_IMAGES,
               payload: [...images, ...seletedImages],
            });
         })
         .catch(e => {
            console.log('image picker error', e);
         });
   }
};

export const onCloseExcutionSheet = () => dispatch => {
   dispatch({ type: CLOSE_EXCUTION_BOTTOM_SHEET });
};

export const onSaveSignature = signature => dispatch => {
   dispatch({ type: SAVE_SIGNATURE, payload: signature });
};

export const deleteImagePath = () => dispatch => {
   dispatch({ type: DELETE_IMAGE_PATH });
};
