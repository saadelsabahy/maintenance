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
   COMPLAIN_NUMBER_CHANGE,
   COMPLAIN_STATUS_CHANGE,
   COMPLAIN_TYPE_CHANGE,
   CONTRUCTOR_ID_CHANGE,
   START_DATE_CHANGE,
   END_DATE_CHANGE,
   SEARCH_SPINNER,
   SEARCH_SUCCESS,
   SEARCH_FAILED,
   SEARCH_PAGINATION_SPINNER,
   SEARCH_PAGINATION_FAILED,
   SEARCH_PAGINATION_SUCCESS,
   PLATE_NUMBER_CHANGE,
   RESET_ALL_SEARCH_INPUTS,
} from '../../actions/ComplainsList/complainsListTypes';

const initialState = {
   statusId: null,
   platNumber: null,
   dateFrom: null,
   dateTo: null,
   contractorId: null,
   rowsNumber: 20,
   pageNumber: 1,
   complainsList: [],
   getComplainsListLoading: false,
   getComplainsListErorr: false,
   paginationLoading: false,
   paginationError: false,
   ////search
   search: false,
   searchLoading: false,
   searchError: false,
   complainNumber: null,
   searchContructorId: null,
   complainStatus: null,
   searchPlateNumber: null,
   complainType: null,
   startDate: null,
   endDate: null,
   complainType: null,
   searchRowsNumber: 25,
   searchPageNumber: 1,
   searchData: [],
   SearchPaginationLoading: false,
   SearchPaginationError: false,
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
         return {
            ...state,
            paginationLoading: true,
            paginationError: false,
            pageNumber: 1,
         };
         break;
      case GET_COMPLAINS_LIST_PAGINATION_SUCCESS:
         return {
            ...state,
            paginationLoading: false,
            paginationError: false,
            complainsList: [...state.complainsList, ...payload.data],
            pageNumber: payload.pageNumber,
         };
         break;
      case GET_COMPLAINS_LIST_PAGINATION_FAILED:
         return { ...state, paginationLoading: false, paginationError: true };
         break;
      case COMPLAIN_NUMBER_CHANGE:
         return { ...state, complainNumber: payload };
         break;
      case COMPLAIN_STATUS_CHANGE:
         return { ...state, complainStatus: payload };
         break;
      case COMPLAIN_TYPE_CHANGE:
         return { ...state, complainType: payload };
         break;
      case CONTRUCTOR_ID_CHANGE:
         return { ...state, searchContructorId: payload };
         break;
      case START_DATE_CHANGE:
         return { ...state, startDate: payload };
         break;
      case END_DATE_CHANGE:
         return { ...state, endDate: payload };
         break;
      case PLATE_NUMBER_CHANGE:
         return { ...state, searchPlateNumber: payload };
      case SEARCH_SPINNER:
         return {
            ...state,
            search: true,
            searchLoading: true,
            searchError: false,
         };
         break;
      case SEARCH_SUCCESS:
         return {
            ...state,
            search: true,
            searchLoading: false,
            searchError: false,
            complainsList: payload,
            searchPageNumber: 1,
         };
         break;
      case SEARCH_FAILED:
         return {
            ...state,
            search: true,
            searchLoading: false,
            searchError: true,
         };
         break;

      case SEARCH_PAGINATION_SPINNER:
         return {
            ...state,
            SearchPaginationLoading: true,
            SearchPaginationError: false,
         };
         break;
      case SEARCH_PAGINATION_SUCCESS:
         return {
            ...state,
            SearchPaginationLoading: false,
            SearchPaginationError: false,
            complainsList: [...state.complainsList, ...payload.data],
            searchPageNumber: payload.pageNumber,
         };
         break;
      case SEARCH_PAGINATION_FAILED:
         return {
            ...state,
            SearchPaginationLoading: false,
            SearchPaginationError: true,
         };
         break;
      case RESET_ALL_SEARCH_INPUTS:
         return { ...initialState };
         break;

      case UNMOUNT_EMPTY:
         return { ...initialState };
         break;
      default:
         return state;
   }
};
