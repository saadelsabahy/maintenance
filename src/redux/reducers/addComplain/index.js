import {
   SELECT_CREATE_COMPLAIN_IMAGES,
   RESET_ADD_COMPLAIN_PHOTOS,
   ADD_COMPLAIN_SPINNER,
   ADD_COMPLAIN_SUCCESS,
   ADD_COMPLAIN_FAILED,
} from '../../actions/addComplain/types';

const initialState = {
   images: [],
   loading: false,
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case SELECT_CREATE_COMPLAIN_IMAGES:
         return {
            ...state,
            images: payload /*  !state.images.length
               ? payload
               : [...payload, ...state.images], */,
         };
         break;
      case ADD_COMPLAIN_SPINNER:
         return {
            ...state,
            loading: true,
         };
         break;
      case ADD_COMPLAIN_SUCCESS:
         return {
            ...state,
            images: [],
            loading: false,
         };
         break;
      case ADD_COMPLAIN_FAILED:
         return {
            ...state,

            loading: false,
         };
         break;
      case RESET_ADD_COMPLAIN_PHOTOS:
         return {
            ...state,
            images: [],
         };
         break;
      default:
         return state;
   }
};
