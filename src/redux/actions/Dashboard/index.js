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

      if (getDashboardResponse.data.statusCode == 200) {
         const {
            data: { data },
         } = getDashboardResponse;
         let dashData = [];
         dashData = data.sort((a, b) => a.StatusId - b.StatusId);
         /* .map(item => {
               dashData[item.StatusId - 1] = item.Total;
            }); */
         console.log('dash dta', dashData);
         dispatch({ type: GET_DASHBOARD_DATA_SUCCESS, payload: dashData });
      }
   } catch (error) {
      console.log('get dashboard data error', error);
      dispatch({ type: GET_DASHBOARD_DATA_FAILED });
   }
};

export const onDashboardFilterChage = text => (dispatch, getState) => {
   dispatch({ type: DASHBOARD_FILTER_INPUT_CHANGE, payload: text });
};
