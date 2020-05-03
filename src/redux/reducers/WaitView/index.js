import {
   GET_SPAREPARTS,
   SELECT_IMAGES_SUCCESS,
   CLOSE_BOTTOM_SHEET,
   IN_GUARANTEE_ITEM_CHECKED,
   OUT_GUARANTEE_ITEM_CHECKED,
   COMMENT_CHANGE,
   PERVIEW_SUCCESS,
   PERVIEW_SPINNER,
   PERVIEW_FAILED,
} from '../../actions/waitView/waitViewTypes';

const initialState = {
   getSparesLoading: false,
   getSparesError: false,
   inGuaranteeSpares: [],
   outGuaranteeSpares: [],
   images: [],
   comment: '',
   perviewSpinner: false,
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
         return { ...state, images: [], comment: '', perviewSpinner: false };
         break;
      case IN_GUARANTEE_ITEM_CHECKED:
         return { ...state, inGuaranteeSpares: payload };
         break;
      case OUT_GUARANTEE_ITEM_CHECKED:
         return { ...state, outGuaranteeSpares: payload };
         break;
      case COMMENT_CHANGE:
         return { ...state, comment: payload };
         break;
      case PERVIEW_SUCCESS:
         return {
            ...initialState,
            inGuaranteeSpares: payload.inSpares,
            outGuaranteeSpares: payload.outSpares,
            perviewSpinner: false,
         };
         break;
      case PERVIEW_SPINNER:
         return { ...state, perviewSpinner: true };
         break;
      case PERVIEW_FAILED:
         return { ...state, perviewSpinner: false };
         break;
      default:
         return state;
   }
};
