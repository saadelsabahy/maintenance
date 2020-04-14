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
} from './complainsListTypes';
import Api from '../../../apis';
/////////////////////////////complains feed
export const getAllComplainsList = () => async (dispatch, getState) => {
   const {
      statusId,
      platNumber,
      dateFrom,
      dateTo,
      contractorId,
      rowsNumber,
      pageNumber,
   } = getState().Complains;
   console.log('params', {
      statusId,
      platNumber,
      dateFrom,
      dateTo,
      contractorId,
      rowsNumber,
      pageNumber,
   });

   try {
      dispatch({ type: GET_COMPLAINS_LIST_SPINNER });
      const getComplainsListResponse = await Api.get(
         `DamageComplain/GetPaging?statusId=${statusId}&platNumber=${platNumber}&dateFrom=${dateFrom}&dateTo=${dateTo}&contractorId=${contractorId}&rowsNumber=${rowsNumber}&pageNumber=${pageNumber}`
      );
      console.log('getComplainsListResponse', getComplainsListResponse);
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
      console.log(
         'getComplainsListResponse pagination',
         getComplainsListResponse
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
      navigation.navigate('waitAprroval', { data, distination: 0 });
   }
};
///////////////////////////////////////////// complains forEach item in dash board

export const emptyListOnUnmount = () => (dispatch, getState) => {
   dispatch({ type: UNMOUNT_EMPTY });
};
