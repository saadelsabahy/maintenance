import {
   SELECT_CREATE_COMPLAIN_IMAGES,
   RESET_ADD_COMPLAIN_PHOTOS,
   ADD_COMPLAIN_SPINNER,
   ADD_COMPLAIN_SUCCESS,
   ADD_COMPLAIN_FAILED,
   GET_CONTRACTORS_AND_VIELECLES_SPINNER,
   GET_CONTRACTORS_AND_VIELECLES_SUCCESS,
   GET_CONTRACTORS_AND_VIELECLES_FAILED,
} from '../../actions/addComplain/types';

const initialState = {
   images: [],
   loading: false,
   contractors: [],
   viehecles: [],
   getContractorsAndVieheclesSpinner: false,
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
      case GET_CONTRACTORS_AND_VIELECLES_SPINNER:
         return {
            ...state,

            getContractorsAndVieheclesSpinner: true,
         };
         break;
      case GET_CONTRACTORS_AND_VIELECLES_SUCCESS:
         return {
            ...state,
            contractors: payload.contractorsData,
            viehecles: payload.vehiclesData,
            getContractorsAndVieheclesSpinner: false,
         };
         break;

      case GET_CONTRACTORS_AND_VIELECLES_FAILED:
         return {
            ...state,

            getContractorsAndVieheclesSpinner: false,
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
