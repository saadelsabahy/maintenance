import {
   GET_DASHBOARD_DATA_FAILED,
   GET_DASHBOARD_DATA_SPINNER,
   GET_DASHBOARD_DATA_SUCCESS,
   DASHBOARD_FILTER_INPUT_CHANGE,
} from './dashboardTypes';
import Api from '../../../apis';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
export const getDashBoardData = () => async (dispatch, getState) => {
   const { filterInput } = getState().Dashboard;
   const userId = await AsyncStorage.getItem('userId');
   try {
      dispatch({ type: GET_DASHBOARD_DATA_SPINNER });
      const getDashboardResponse = await Api.get(
         `Complians/DashboardStatistics?ContractorId=${
            !filterInput ? null : filterInput
         }`
      );
      let badge;
      await firestore()
         .collection('users')
         .doc(userId)
         .get()
         .then(querySnapshot => {
            badge = querySnapshot._data.notificationBadge;
         })
         .catch(e => console.log('get firedata error', e));
      if (getDashboardResponse.data.statusCode == 200) {
         const {
            data: { data },
         } = getDashboardResponse;
         let dashData = [];
         dashData = data.sort((a, b) => a.StatusId - b.StatusId);
         const getContractors = await Api.get(`Contractors`);
         const { data: contractors } = getContractors.data;
         const contractorsData = contractors.map(({ Id, NameAr, NameEn }) => ({
            Id,
            value: NameAr,
            NameEn,
         }));
         dispatch({
            type: GET_DASHBOARD_DATA_SUCCESS,
            payload: { dashData, badge, contractorsData },
         });
      }
   } catch (error) {
      console.log('get dashboard data error', error);
      dispatch({ type: GET_DASHBOARD_DATA_FAILED });
   }
};

export const onDashboardFilterChage = text => (dispatch, getState) => {
   dispatch({ type: DASHBOARD_FILTER_INPUT_CHANGE, payload: text });
};
