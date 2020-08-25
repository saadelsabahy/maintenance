import Api from '../../../apis';
import {
   GET_SPAREPARTS,
   SELECT_IMAGES_SUCCESS,
   CLOSE_BOTTOM_SHEET,
   IN_GUARANTEE_ITEM_CHECKED,
   OUT_GUARANTEE_ITEM_CHECKED,
   PERVIEW_SPINNER,
   PERVIEW_FAILED,
   COMMENT_CHANGE,
   PERVIEW_SUCCESS,
} from './waitViewTypes';
import ImagePicker from 'react-native-image-crop-picker';

import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { showFlashMessage } from '../../../utils/flashMessage';
import { Platform } from 'react-native';
import {
   SOLVED,
   OUT_WARNTY,
   IN_WARNTY,
   WAIT_APPROVAL,
} from '../../../utils/complainsStutus';
export const getSpareParts = () => async (dispatch, getState) => {
   try {
      const outGuaranteeSpares = await Api.get(
         `SparePart/GetByGuarantee?guarantee=${false}`
      );
      const inGuaranteeSpares = await Api.get(
         `SparePart/GetByGuarantee?guarantee=${true}`
      );
      if (outGuaranteeSpares.status == 200 && inGuaranteeSpares.status == 200) {
         Reactotron.log('spares', inGuaranteeSpares, inGuaranteeSpares);
         dispatch({
            type: GET_SPAREPARTS,
            payload: {
               in: inGuaranteeSpares.data,
               out: outGuaranteeSpares.data,
            },
         });
      }
   } catch (error) {
      console.log('get spare parts error', error);
   }
};

export const onSelectImagesPressed = type => (dispatch, getState) => {
   const { images } = getState().WaitView;
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
               type: SELECT_IMAGES_SUCCESS,
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
               type: SELECT_IMAGES_SUCCESS,
               payload: [...images, ...seletedImages],
            });
         })
         .catch(e => {
            console.log('image picker error', e);
         });
   }
};
export const handleCheckItem = (index, Id, selectedButton) => (
   dispatch,
   getState
) => {
   const { outGuaranteeSpares, inGuaranteeSpares } = getState().WaitView;
   if (selectedButton == 0) {
      inGuaranteeSpares[index]['checked'] = !inGuaranteeSpares[index][
         'checked'
      ];
      dispatch({ type: IN_GUARANTEE_ITEM_CHECKED, payload: inGuaranteeSpares });
   } else {
      outGuaranteeSpares[index]['checked'] = !outGuaranteeSpares[index][
         'checked'
      ];
      dispatch({
         type: OUT_GUARANTEE_ITEM_CHECKED,
         payload: outGuaranteeSpares,
      });
   }
};

export const handlePerview = (
   { complainNumber, complainStatus },
   guranteeStatus,
   navigation
) => async (dispatch, getState) => {
   const {
      images,
      inGuaranteeSpares,
      outGuaranteeSpares,
      comment,
   } = getState().WaitView;
   const inGuarnteeSelectedParts = inGuaranteeSpares
      .filter(item => item.checked == true)
      .map(({ Id, NameAr, NameOther, Guarantee, Price }) => ({
         Id,
         NameAr,
         NameOther,
         NameOther,
         Guarantee,
         Price,
      }));

   const outGuarnteeSelectedParts = outGuaranteeSpares
      .filter(item => item.checked == true)
      .map(({ Id, NameAr, NameOther, Guarantee, Price }) => ({
         Id,
         NameAr,
         NameOther,
         NameOther,
         Guarantee,
         Price,
      }));

   const userId = await AsyncStorage.getItem('userId');

   if (images.length < 1 && guranteeStatus == OUT_WARNTY) {
      showFlashMessage('danger', 'يجب اضافه صوره العطل');
   } else if (guranteeStatus == 0 && inGuarnteeSelectedParts.length < 1) {
      showFlashMessage('danger', 'يجب تحديد قطع الغيار داخل الضمان المستخدمه');
   } else if (
      guranteeStatus == OUT_WARNTY &&
      outGuarnteeSelectedParts.length < 1
   ) {
      showFlashMessage('danger', 'يجب تحديد قطع الغيار خارج الضمان المستخدمه');
   } else {
      Reactotron.log(images);

      try {
         dispatch({ type: PERVIEW_SPINNER });
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
         await uploadPerviewImage(
            guranteeStatus,
            complainNumber,
            complainStatus,
            guranteeStatus == IN_WARNTY && !images.length ? null : form
         );

         const perviewResponse = await Api.post(
            `Complians/UpdateStatus?StatusId=${
               guranteeStatus == OUT_WARNTY ? WAIT_APPROVAL : SOLVED
            }&UserId=${userId}&ComplianId=${+complainNumber}&IsInWarranty=${guranteeStatus ==
               IN_WARNTY}&Comment=${comment}`,
            guranteeStatus == IN_WARNTY
               ? inGuarnteeSelectedParts
               : outGuarnteeSelectedParts
         );
         if (perviewResponse.data.statusCode == 200) {
            await dispatch({
               type: PERVIEW_SUCCESS,
               payload: {
                  outSpares: outGuarnteeSelectedParts,
                  inSpares: inGuarnteeSelectedParts,
               },
            });
            navigation.goBack();
         }
      } catch (error) {
         console.log('preview error', error);
         dispatch({
            type: PERVIEW_FAILED,
         });
         showFlashMessage('danger', 'حدث خطا برجاء اعاده المحاوله');
      }
   }
};
export const onCommentChange = text => dispatch => {
   dispatch({
      type: COMMENT_CHANGE,
      payload: text,
   });
};
export const closeBottomSheet = () => (dispatch, getState) => {
   const { outGuaranteeSpares, inGuaranteeSpares } = getState().WaitView;
   const unCheckedInSpares = inGuaranteeSpares.map(item => ({
      ...item,
      checked: false,
   }));
   const unCheckedOutSpares = outGuaranteeSpares.map(item => ({
      ...item,
      checked: false,
   }));
   dispatch({
      type: CLOSE_BOTTOM_SHEET,
      payload: { unCheckedInSpares, unCheckedOutSpares },
   });
};

const uploadPerviewImage = async (
   guranteeStatus,
   complainNumber,
   complainStatus,
   form
) => {
   let response;

   try {
      if (guranteeStatus) {
         const uploadoutGrantee = await Api.post(
            `Complians/UploadImages?ComplianId=${+complainNumber}&StatusId=${+complainStatus}`,
            form,
            { headers: { 'Content-Type': 'multipart/form-data' } }
         );
         response = uploadoutGrantee;
      } else {
         if (form) {
            const uploadInGrantee = await Api.post(
               `Complians/UploadImages?ComplianId=${+complainNumber}&StatusId=${+complainStatus}`,
               form,
               { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            response = uploadInGrantee;
         } else {
            return;
         }
      }
   } catch (error) {
      console.log('upload perview image error', error);
   }
   return response;
};
