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
} from './waitViewTypes';
import ImagePicker from 'react-native-image-crop-picker';

import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';
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

export const onSelectImagesPressed = () => dispatch => {
   ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: false,
      multiple: true,
   })
      .then(seletedImages => {
         const images = [];
         images.push(...seletedImages);
         dispatch({ type: SELECT_IMAGES_SUCCESS, payload: images });
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
   guranteeStatus
) => async (dispatch, getState) => {
   const {
      images,
      inGuaranteeSpares,
      outGuaranteeSpares,
      comment,
   } = getState().WaitView;
   const inGuarnteeSelectedParts = inGuaranteeSpares
      .filter(item => item.checked == true)
      .map(({ Id, NameAr, NameOther, Guarantee }) => ({
         Id,
         NameAr,
         NameOther,
         NameOther,
         Guarantee,
      }));

   const outGuarnteeSelectedParts = outGuaranteeSpares
      .filter(item => item.checked == true)
      .map(({ Id, NameAr, NameOther, Guarantee }) => ({
         Id,
         NameAr,
         NameOther,
         NameOther,
         Guarantee,
      }));

   const userId = await AsyncStorage.getItem('userId');

   try {
      dispatch({ type: PERVIEW_SPINNER });
      const form = new FormData();
      images.map(({ mime, path }, index) => {
         form.append('image', {
            uri: Platform.OS == 'android' ? path : path.replace('file://', ''),
            type: mime,
            name: `picture${index}`,
         });
      });
      /*  const uploadImageResponse = await Api.post(
         `Complians/UploadImages?ComplianId=${+complainNumber}&StatusId=${+complainStatus}`,
         form,
         { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      Reactotron.log(uploadImageResponse); */
      const perviewResponse = await Api.post(
         `Complians/UpdateStatus?StatusId=${+complainStatus +
            1}&UserId=${+userId}&ComplianId=${+complainNumber}&IsInWarranty=${guranteeStatus ==
            0}&Comment=${comment}`,
         {
            SpareParts:
               guranteeStatus == 0
                  ? inGuarnteeSelectedParts
                  : outGuarnteeSelectedParts,
         }
      );
      console.log(perviewResponse);
   } catch (error) {
      console.log('preview error', error);
      dispatch({ type: PERVIEW_FAILED });
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
