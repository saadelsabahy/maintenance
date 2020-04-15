import {
   GET_COMPLAINS_LIST_FAILED,
   GET_COMPLAINS_LIST_SPINNER,
   GET_COMPLAINS_LIST_SUCCESS,
   GET_COMPLAINS_LIST_PAGINATION_FAILED,
   GET_COMPLAINS_LIST_PAGINATION_SPINNER,
   GET_COMPLAINS_LIST_PAGINATION_SUCCESS,
   GET_DASHBOARD_COMPLAINS_FAILED,
   GET_DASHBOARD_COMPLAINS_SPINNER,
   GET_DASHBOARD_COMPLAINS_SUCCESS,
   UNMOUNT_EMPTY,
   COMPLAIN_NUMBER_CHANGE,
   CONTRUCTOR_ID_CHANGE,
   COMPLAIN_STATUS_CHANGE,
   PLATE_NUMBER_CHANGE,
   COMPLAIN_TYPE_CHANGE,
   START_DATE_CHANGE,
   END_DATE_CHANGE,
   SEARCH_SUCCESS,
   SEARCH_FAILED,
   SEARCH_SPINNER,
   SEARCH_PAGINATION_SPINNER,
   SEARCH_PAGINATION_FAILED,
   SEARCH_PAGINATION_SUCCESS,
} from './complainsListTypes';
import Api from '../../../apis';
/////////////////////////////complains feed
export const getAllComplainsList = statusId => async (dispatch, getState) => {
   const {
      platNumber,
      dateFrom,
      dateTo,
      contractorId,
      rowsNumber,
      pageNumber,
   } = getState().Complains;


   try {
      dispatch({ type: GET_COMPLAINS_LIST_SPINNER });
      const getComplainsListResponse = await Api.get(
         `DamageComplain/GetPaging?statusId=${statusId}&platNumber=${platNumber}&dateFrom=${dateFrom}&dateTo=${dateTo}&contractorId=${contractorId}&rowsNumber=${rowsNumber}&pageNumber=${pageNumber}`
      );
      if (getComplainsListResponse.status == 200) {
         const { data } = getComplainsListResponse;
         dispatch({ type: GET_COMPLAINS_LIST_SUCCESS, payload: data });
      }
   } catch (error) {
      console.log('get complains list error', error);
      dispatch({ type: GET_COMPLAINS_LIST_FAILED });
   }
};
export const LoadPagination = () => async (dispatch, getState) => {
   const {
      statusId,
      platNumber,
      dateFrom,
      dateTo,
      contractorId,
      rowsNumber,
      pageNumber,
   } = getState().Complains;
   try {
      dispatch({ type: GET_COMPLAINS_LIST_PAGINATION_SPINNER });
      const getComplainsListResponse = await Api.get(
         `DamageComplain/GetPaging?statusId=${statusId}&platNumber=${platNumber}&dateFrom=${dateFrom}&dateTo=${dateTo}&contractorId=${contractorId}&rowsNumber=${rowsNumber}&pageNumber=${pageNumber}`
      );

      if (getComplainsListResponse.status == 200) {
         const { data } = getComplainsListResponse;
         dispatch({
            type: GET_COMPLAINS_LIST_PAGINATION_SUCCESS,
            payload: data,
         });
      }
   } catch (error) {
      console.log('get complains list error pagination', error);
      dispatch({ type: GET_COMPLAINS_LIST_PAGINATION_FAILED });
   }
};

export const onComplainPressed = (data, navigation, route) => () => {
   if (route.params && route.params.hasOwnProperty('distination')) {
      const { distination } = route.params;

      switch (route.params.distination) {
         case 1:
            navigation.navigate('waitView', { data });
            break;
         default:
            navigation.navigate('waitAprroval', { data, distination });
            break;
      }
   } else {
      switch (data.statusId) {
         case 1:
            navigation.navigate('waitView', { data });
            break;

         default:
            navigation.navigate('waitView', { data, distination: data.statusId });
            break;
      }
   }
};
/////////////////////////////////////////////search
export const onSearchInputsChange = (inputName, inputValue) => (dispatch) => {
   switch (inputName) {
      case 'complainNumber':
         dispatch({ type: COMPLAIN_NUMBER_CHANGE, payload: inputValue })
         break;
      case 'contructorId':
         dispatch({ type: CONTRUCTOR_ID_CHANGE, payload: inputValue })
         break;
      case 'complainStatus':
         dispatch({ type: COMPLAIN_STATUS_CHANGE, payload: inputValue })
         break;
      case 'plateNumber':
         dispatch({ type: PLATE_NUMBER_CHANGE, payload: inputValue })
         break;
      case 'complainType':
         dispatch({ type: COMPLAIN_TYPE_CHANGE, payload: inputValue })
         break;
      case 'startDate':
         dispatch({ type: START_DATE_CHANGE, payload: inputValue })
         break;
      case 'endDate':
         dispatch({ type: END_DATE_CHANGE, payload: inputValue })
         break;

   }
}

export const onSearchPressed = (source) => async (dispatch, getState) => {
   const {
      complainNumber,
      contructorId,
      complainStatus,
      plateNumber,
      complainType,
      startDate,
      searchRowsNumber,
      endDate, searchPageNumber } = getState().Complains


   try {
      dispatch({ type: SEARCH_SPINNER });
      const getSearchListResponse = await Api.get(
         `DamageComplain/GetPaging?statusId=${source}&platNumber=${plateNumber}&dateFrom=${startDate}&dateTo=${endDate}&contractorId=${contructorId}&rowsNumber=${searchRowsNumber}&pageNumber=${searchPageNumber}`
      );

      if (getSearchListResponse.status == 200) {
         const { data } = getSearchListResponse;
         dispatch({
            type: SEARCH_SUCCESS,
            payload: data,
         });
      }
   } catch (error) {
      console.log('search error', error);
      dispatch({ type: SEARCH_FAILED });
   }
}



export const LoadSearchPagination = (source) => async (dispatch, getState) => {
   const {
      complainNumber,
      contructorId,
      complainStatus,
      plateNumber,
      complainType,
      startDate,
      searchRowsNumber,
      endDate, searchPageNumber } = getState().Complains
   try {
      dispatch({ type: SEARCH_PAGINATION_SPINNER });
      const searchPaginationtResponse = await Api.get(
         `DamageComplain/GetPaging?statusId=${source}&platNumber=${plateNumber}&dateFrom=${startDate}&dateTo=${endDate}&contractorId=${contructorId}&rowsNumber=${searchRowsNumber}&pageNumber=${searchPageNumber}`
      );

      if (searchPaginationtResponse.status == 200) {
         const { data } = searchPaginationtResponse;
         dispatch({
            type: SEARCH_PAGINATION_SUCCESS,
            payload: data,
         });
      }
   } catch (error) {
      console.log('search error pagination', error);
      dispatch({ type: SEARCH_PAGINATION_FAILED });
   }
};

/////////////////////////////////////////////////////delete data
export const emptyListOnUnmount = () => (dispatch, getState) => {
   dispatch({ type: UNMOUNT_EMPTY });
};
