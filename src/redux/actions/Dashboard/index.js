import {
   GET_DASHBOARD_DATA_FAILED,
   GET_DASHBOARD_DATA_SPINNER,
   GET_DASHBOARD_DATA_SUCCESS,
} from './dashboardTypes';
import Api from '../../../apis';
export const getDashBoardData = () => async (dispatch, getState) => {
   try {
      dispatch({ type: GET_DASHBOARD_DATA_SPINNER });
      const getDashboardResponse = await Api.get(`DamageComplain/GetDashboard`);

      if (getDashboardResponse.status == 200) {
         const { data } = getDashboardResponse;
         const totals = data.map(item => item.Total);

         dispatch({ type: GET_DASHBOARD_DATA_SUCCESS, payload: totals });
      }
   } catch (error) {
      console.log('get dashboard data error', error);
      dispatch({ type: GET_DASHBOARD_DATA_FAILED });
   }
};
