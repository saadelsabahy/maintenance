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
import database from '../../../models';
import Reactotron from 'reactotron-react-native';
import { Q } from '@nozbe/watermelondb';
/////////////////////////////complains feed
export const getAllComplainsList = (statusId, sort) => async (
   dispatch,
   getState
) => {
   const {
      platNumber,
      dateFrom,
      dateTo,
      contractorId,
      rowsNumber,
      pageNumber,
      complainType,
   } = getState().Complains;
   try {
      dispatch({ type: GET_COMPLAINS_LIST_SPINNER });
      const getComplainsListResponse = await Api.get(
         `Complians?From=${dateFrom}&To=${dateTo}&ComplianId=${null}&ComplianType=${complainType}&plateNumber=${platNumber}&StatusId=${statusId}&ContractorId=${contractorId}&PageIndex=${pageNumber}&PageSize=${rowsNumber}&Sort=${sort}`
      );
      if (getComplainsListResponse.status == 200) {
         const {
            data: { data },
         } = getComplainsListResponse;

         /* await saveDataForOffline(data);
         const base = database.collections.get('complains');
         const cached = await base.query().fetch();
         Reactotron.log(cached); */

         dispatch({
            type: GET_COMPLAINS_LIST_SUCCESS,
            payload: data ? data : [],
         });
      }
   } catch (error) {
      console.log('get complains list error', error);
      dispatch({ type: GET_COMPLAINS_LIST_FAILED });
   }
};
export const LoadPagination = (statusId, sort) => async (
   dispatch,
   getState
) => {
   const {
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
         `Complians/Get?From=${dateFrom}&To=${dateTo}&ComplianId=${null}&ComplianType=${statusId}&plateNumber=${platNumber}&StatusId=${statusId}&ContractorId=${contractorId}&Index=${pageNumber +
            1}&PageSize=${rowsNumber}&Sort=${sort}`
      );

      if (getComplainsListResponse.status == 200) {
         const {
            data: { data },
         } = getComplainsListResponse;
         dispatch({
            type: GET_COMPLAINS_LIST_PAGINATION_SUCCESS,
            payload: { data: data ? data : [], pageNumber: pageNumber + 1 },
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
            navigation.navigate('waitView', {
               data,
               distination: data.statusId,
            });
            break;
      }
   }
};
/////////////////////////////////////////////search
export const onSearchInputsChange = (inputName, inputValue) => dispatch => {
   switch (inputName) {
      case 'complainNumber':
         dispatch({ type: COMPLAIN_NUMBER_CHANGE, payload: inputValue });
         break;
      case 'contructorId':
         dispatch({ type: CONTRUCTOR_ID_CHANGE, payload: inputValue });
         break;
      case 'complainStatus':
         dispatch({ type: COMPLAIN_STATUS_CHANGE, payload: inputValue });
         break;
      case 'plateNumber':
         dispatch({ type: PLATE_NUMBER_CHANGE, payload: inputValue });
         break;
      case 'complainType':
         dispatch({ type: COMPLAIN_TYPE_CHANGE, payload: inputValue });
         break;
      case 'startDate':
         dispatch({ type: START_DATE_CHANGE, payload: inputValue });
         break;
      case 'endDate':
         dispatch({ type: END_DATE_CHANGE, payload: inputValue });
         break;
   }
};

export const onSearchPressed = (source, sort) => async (dispatch, getState) => {
   const {
      complainNumber,
      contructorId,
      complainStatus,
      plateNumber,
      complainType,
      startDate,
      searchRowsNumber,
      endDate,
      searchPageNumber,
   } = getState().Complains;

   try {
      dispatch({ type: SEARCH_SPINNER });
      const getSearchListResponse = await Api.get(
         `Complians/Get?From=${startDate}&To=${endDate}&ComplianId=${complainNumber}&ComplianType=${complainType}&plateNumber=${plateNumber}&StatusId=${source}&ContractorId=${contructorId}&Index=${searchPageNumber}&PageSize=${searchRowsNumber}&Sort=${sort}`
      );

      if (getSearchListResponse.status == 200) {
         const {
            data: { data },
         } = getSearchListResponse;
         dispatch({
            type: SEARCH_SUCCESS,
            payload: data ? data : [],
         });
      }
   } catch (error) {
      console.log('search error', error);
      dispatch({ type: SEARCH_FAILED });
   }
};

export const LoadSearchPagination = (source, sort) => async (
   dispatch,
   getState
) => {
   const {
      complainNumber,
      contructorId,
      complainStatus,
      plateNumber,
      complainType,
      startDate,
      searchRowsNumber,
      endDate,
      searchPageNumber,
   } = getState().Complains;
   try {
      dispatch({ type: SEARCH_PAGINATION_SPINNER });
      const searchPaginationtResponse = await Api.get(
         `Complians/Get?From=${startDate}&To=${endDate}&ComplianId=${complainNumber}&ComplianType=${complainType}&plateNumber=${plateNumber}&StatusId=${source}&ContractorId=${contructorId}&Index=${searchPageNumber +
            1}&PageSize=${searchRowsNumber}&Sort=${sort}`
      );

      if (searchPaginationtResponse.status == 200) {
         const {
            data: { data },
         } = searchPaginationtResponse;
         dispatch({
            type: SEARCH_PAGINATION_SUCCESS,
            payload: {
               data: data ? data : [],
               pageNumber: searchPageNumber + 1,
            },
         });
      }
   } catch (error) {
      console.log('search error pagination', error);
      dispatch({ type: SEARCH_PAGINATION_FAILED });
   }
};
///////////////////////////////////////////save in db
const saveDataForOffline = async data => {
   await database.action(async () => {
      data.map(async (item, index) => {
         database.collections.get('complains').update;
         database.collections.get('complains').create(complain => {
            complain.complain_id = item.Id;
            complain.Contractor_id = item.ContractorId;
            complain.Status_id = item.StatusId;
            complain.Cretaed_on = item.CretaedOn;
            complain.Vehicle_id = item.VehicleId;
            complain.Plate_number = item.PlateNumber;
            complain.Vehicle_type = 'ddd';
         });
      });
   });
};
/////////////////////////////////////////////////////delete data
export const emptyListOnUnmount = () => (dispatch, getState) => {
   dispatch({ type: UNMOUNT_EMPTY });
};
