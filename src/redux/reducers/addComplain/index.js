import {
   SELECT_CREATE_COMPLAIN_IMAGES,
   RESET_ADD_COMPLAIN_PHOTOS,
} from '../../actions/addComplain/types';

const initialState = {
   images: [],
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
