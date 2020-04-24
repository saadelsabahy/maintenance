import {
   GET_SPAREPARTS,
   SELECT_IMAGES_SUCCESS,
   CLOSE_BOTTOM_SHEET,
   IN_GUARANTEE_ITEM_CHECKED,
   OUT_GUARANTEE_ITEM_CHECKED,
} from '../../actions/waitView/waitViewTypes';

const initialState = {
   getSparesLoading: false,
   getSparesError: false,
   inGuaranteeSpares: [],
   outGuaranteeSpares: [],
   images: [],
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case GET_SPAREPARTS:
         return {
            ...state,
            inGuaranteeSpares: payload.in,
            outGuaranteeSpares: payload.out,
         };
         break;

      case SELECT_IMAGES_SUCCESS:
         return {
            ...state,
            images: payload,
         };
         break;

      case CLOSE_BOTTOM_SHEET:
         return { ...state, images: [] };
         break;
      case IN_GUARANTEE_ITEM_CHECKED:
         return { ...state, inGuaranteeSpares: payload };
         break;
      case OUT_GUARANTEE_ITEM_CHECKED:
         return { ...state, outGuaranteeSpares: payload };
         break;
      default:
         return state;
   }
};