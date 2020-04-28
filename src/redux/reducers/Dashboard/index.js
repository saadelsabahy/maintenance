import {
   GET_DASHBOARD_DATA_SPINNER,
   GET_DASHBOARD_DATA_SUCCESS,
   GET_DASHBOARD_DATA_FAILED,
} from '../../actions/Dashboard/dashboardTypes';
import moment from 'moment';
const initialState = {
   dashboardSpinner: false,
   dashboardError: false,
   dashboardData: [],
   lastUpdate: '',
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case GET_DASHBOARD_DATA_SPINNER:
         return { ...state, dashboardError: false, dashboardSpinner: true };
         break;
      case GET_DASHBOARD_DATA_SUCCESS:
         return {
            ...state,
            dashboardError: false,
            dashboardSpinner: false,
            dashboardData: payload,
            lastUpdate: moment()
               .locale('eg')
               .format('LT'),
         };
         break;
      case GET_DASHBOARD_DATA_FAILED:
         return { ...state, dashboardError: true, dashboardSpinner: false };
         break;
      default:
         return state;
   }
};
