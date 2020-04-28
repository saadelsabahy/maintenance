import {
   GET_DASHBOARD_DATA_FAILED,
   GET_DASHBOARD_DATA_SPINNER,
   GET_DASHBOARD_DATA_SUCCESS,
   DASHBOARD_FILTER_INPUT_CHANGE,
} from './dashboardTypes';
import Api from '../../../apis';
export const getDashBoardData = () => async (dispatch, getState) => {
   const { filterInput } = getState().Dashboard;
   try {
      dispatch({ type: GET_DASHBOARD_DATA_SPINNER });
      const getDashboardResponse = await Api.get(
         `Complians/DashboardStatistics?ContractorId=${
            !filterInput ? null : filterInput
         }`
      );

      if (getDashboardResponse.status == 200) {
         const {
            data: { data },
         } = getDashboardResponse;
         const totals = data.map(item => item.Total);

         dispatch({ type: GET_DASHBOARD_DATA_SUCCESS, payload: totals });
      }
   } catch (error) {
      console.log('get dashboard data error', error);
      dispatch({ type: GET_DASHBOARD_DATA_FAILED });
   }
};

export const onDashboardFilterChage = text => (dispatch, getState) => {
   dispatch({ type: DASHBOARD_FILTER_INPUT_CHANGE, payload: text });
};
