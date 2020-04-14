import {
   GET_WAITVIEW_COMPLAINS_SPINNER,
   GET_WAITVIEW_COMPLAINS_SUCCESS,
   GET_WAITVIEW_COMPLAINS_FAILED,
} from '../../actions/waitView/waitViewTypes';

const initialState = {
   statusId: null,
   platNumber: null,
   dateFrom: null,
   dateTo: null,
   contractorId: null,
   rowsNumber: 10,
   pageNumber: 0,
   waitViewComplains: [],
   waitViewComplainsListLoading: false,
   waitViewComplainsListErorr: false,
   waitViewPaginationLoading: false,
   waitViewPaginationError: false,
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case GET_WAITVIEW_COMPLAINS_SPINNER:
         return {
            ...state,
            waitViewComplainsListLoading: true,
            waitViewComplainsListErorr: false,
         };
         break;

      case GET_WAITVIEW_COMPLAINS_SUCCESS:
         return {
            ...state,
            waitViewComplainsListLoading: false,
            waitViewComplainsListErorr: false,
            waitViewComplains: payload,
         };
         break;

      case GET_WAITVIEW_COMPLAINS_FAILED:
         return {
            ...state,
            waitViewComplainsListLoading: false,
            waitViewComplainsListErorr: true,
         };
         break;

      default:
         return state;
   }
};
