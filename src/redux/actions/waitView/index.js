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
import { SOLVED } from '../../../utils/complainsStutus';
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

export const onSelectImagesPressed = () => (dispatch, getState) => {
   const { images } = getState().WaitView;
   ImagePicker.openCamera({
      width: 200,
      height: 200,
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      cropping: false,
      multiple: true,
      mediaType: 'photo',
   })
      .then(seletedImages => {
         dispatch({
            type: SELECT_IMAGES_SUCCESS,
            payload: [...images, seletedImages],
         });
      })
      .catch(e => {
         console.log('image picker error', e);
      });
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

   if (images.length < 1) {
      showFlashMessage('danger', 'يجب اضافه صوره العطل');
   } else if (guranteeStatus == 0 && inGuarnteeSelectedParts.length < 1) {
      showFlashMessage('danger', 'يجب تحديد قطع الغيار داخل الضمان المستخدمه');
   } else if (guranteeStatus == 1 && outGuarnteeSelectedParts.length < 1) {
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
         await Api.post(
            `Complians/UploadImages?ComplianId=${+complainNumber}&StatusId=${+complainStatus}`,
            form,
            { headers: { 'Content-Type': 'multipart/form-data' } }
         );

         const perviewResponse = await Api.post(
            `Complians/UpdateStatus?StatusId=${
               guranteeStatus == 1 ? +complainStatus + 1 : SOLVED
            }&UserId=${userId}&ComplianId=${+complainNumber}&IsInWarranty=${guranteeStatus ==
               0}&Comment=${comment}`,

            guranteeStatus == 0
               ? inGuarnteeSelectedParts
               : outGuarnteeSelectedParts
         );
         Reactotron.log(perviewResponse);
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
         showFlashMessage('danger', 'جدث خطا برجاء اعاده المحاوله');
      }
   }
};
export const onCommentChange = text => dispatch => {
   dispatch({
      type: COMMENT_CHANGE,
      payload: text,
   });
};
export const closeBottomSheet = () => dispatch => {
   dispatch({ type: CLOSE_BOTTOM_SHEET });
};
