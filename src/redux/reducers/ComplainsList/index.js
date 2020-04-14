import {
   GET_COMPLAINS_LIST_SPINNER,
   GET_COMPLAINS_LIST_SUCCESS,
   GET_COMPLAINS_LIST_FAILED,
   GET_COMPLAINS_LIST_PAGINATION_SPINNER,
   GET_COMPLAINS_LIST_PAGINATION_SUCCESS,
   GET_COMPLAINS_LIST_PAGINATION_FAILED,
   GET_DASHBOARD_COMPLAINS_SUCCESS,
   GET_DASHBOARD_COMPLAINS_SPINNER,
   GET_DASHBOARD_COMPLAINS_FAILED,
   UNMOUNT_EMPTY,
} from '../../actions/ComplainsList/complainsListTypes';

const initialState = {
   statusId: null,
   platNumber: null,
   dateFrom: null,
   dateTo: null,
   contractorId: null,
   rowsNumber: 10,
   pageNumber: 0,
   complainsList: [],
   getComplainsListLoading: false,
   getComplainsListErorr: false,
   paginationLoading: false,
   paginationError: false,
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case GET_COMPLAINS_LIST_SPINNER:
         return {
            ...state,
            getComplainsListLoading: true,
            getComplainsListErorr: false,
         };
         break;
      case GET_COMPLAINS_LIST_SUCCESS:
         return {
            ...state,
            getComplainsListLoading: false,
            getComplainsListErorr: false,
            complainsList: payload,
            pageNumber: state.pageNumber + 1,
         };
         break;
      case GET_COMPLAINS_LIST_FAILED:
         return {
            ...state,
            getComplainsListLoading: false,
            getComplainsListErorr: true,
         };
         break;
      case GET_COMPLAINS_LIST_PAGINATION_SPINNER:
         return { ...state, paginationLoading: true, paginationError: false };
         break;
      case GET_COMPLAINS_LIST_PAGINATION_SUCCESS:
         return {
            ...state,
            paginationLoading: false,
            paginationError: false,
            complainsList: [...state.complainsList, ...payload],
            pageNumber: state.pageNumber + 1,
         };
         break;
      case GET_COMPLAINS_LIST_PAGINATION_FAILED:
         return { ...state, paginationLoading: false, paginationError: true };
         break;

      /*       case GET_DASHBOARD_COMPLAINS_SPINNER:
         return {
            ...state,
            getComplainsListLoading: true,
            getComplainsListErorr: false,
         };
         break;

      case GET_DASHBOARD_COMPLAINS_SUCCESS:
         return {
            ...state,
            getComplainsListLoading: false,
            getComplainsListErorr: false,
            complainsList: payload,
            pageNumber: state.pageNumber + 1,
         };
         break;

      case GET_DASHBOARD_COMPLAINS_FAILED:
         return {
            ...state,
            getComplainsListLoading: false,
            getComplainsListErorr: true,
         };
         break;
      case UNMOUNT_EMPTY:
         return { ...initialState }; */
      default:
         return state;
   }
};
