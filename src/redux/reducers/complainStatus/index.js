import {
   SELECT_EXCUTION_IMAGES,
   APPROVE_SPINNER,
   APPROVE_SUCCESS,
   APPROVE_FAILED,
   REJECT_SPINNER,
   REJECT_SUCCESS,
   REJECT_FAILED,
   EXCUTION_SPINNER,
   EXCUTION_SUCCESS,
   EXCUTION_FAILED,
   CLOSE_EXCUTION_BOTTOM_SHEET,
   SAVE_SIGNATURE,
   DELETE_IMAGE_PATH,
} from '../../actions/complainStatus/types';

const initialState = {
   images: [],
   acceptSpinner: false,
   rejectSpinner: false,
   excutionSpinner: false,
   signature: '',
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case SELECT_EXCUTION_IMAGES:
         return { ...state, images: payload };
      case APPROVE_SPINNER:
         return { ...state, acceptSpinner: true };
         break;

      case APPROVE_SUCCESS:
         return { ...state, acceptSpinner: false };
         break;
      case APPROVE_FAILED:
         return { ...state, acceptSpinner: false };
         break;

      case REJECT_SPINNER:
         return { ...state, rejectSpinner: true };
         break;

      case REJECT_SUCCESS:
         return { ...state, rejectSpinner: false };
         break;

      case REJECT_FAILED:
         return { ...state, rejectSpinner: false };
         break;
      case EXCUTION_SPINNER:
         return { ...state, excutionSpinner: true };
         break;

      case EXCUTION_SUCCESS:
         return { ...state, excutionSpinner: false, images: [] };
         break;

      case EXCUTION_FAILED:
         return { ...state, excutionSpinner: false };
         break;
      case SAVE_SIGNATURE:
         return { ...state, signature: payload };
         break;
      case DELETE_IMAGE_PATH:
         return { ...state, signature: '' };
         break;
      case CLOSE_EXCUTION_BOTTOM_SHEET:
         return { ...state, images: [] };
         break;
      default:
         return state;
   }
};
