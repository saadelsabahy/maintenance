import {
   GET_DASHBOARD_DATA_SPINNER,
   GET_DASHBOARD_DATA_SUCCESS,
   GET_DASHBOARD_DATA_FAILED,
   DASHBOARD_FILTER_INPUT_CHANGE,
} from '../../actions/Dashboard/dashboardTypes';
import moment from 'moment';
const initialState = {
   dashboardSpinner: false,
   dashboardError: false,
   dashboardData: [],
   lastUpdate: '',
   filterInput: '',
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
            lastUpdate: moment().format('LT'),
         };
         break;
      case GET_DASHBOARD_DATA_FAILED:
         return { ...state, dashboardError: true, dashboardSpinner: false };
         break;
      case DASHBOARD_FILTER_INPUT_CHANGE:
         return { ...state, filterInput: payload };
         break;
      default:
         return state;
   }
};
