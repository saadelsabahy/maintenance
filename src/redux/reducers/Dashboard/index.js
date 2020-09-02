import {
   GET_DASHBOARD_DATA_SPINNER,
   GET_DASHBOARD_DATA_SUCCESS,
   GET_DASHBOARD_DATA_FAILED,
   DASHBOARD_FILTER_INPUT_CHANGE,
} from '../../actions/Dashboard/dashboardTypes';
import moment from 'moment';
import { LOGOUT_SUCCESS } from '../../actions/Auth/AuthTypes';
import { GET_NOTIFICATON_SUCCESS } from '../../actions/notifications/types';
const initialState = {
   dashboardSpinner: false,
   dashboardError: false,
   dashboardData: [],
   lastUpdate: '',
   filterInput: '',
   badge: 0,
   contractors: [],
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
            dashboardData: payload.dashData,
            lastUpdate: moment().format('hh:mm:ss a'),
            badge: payload.badge,
            contractors: payload.contractorsData,
         };
         break;
      case GET_DASHBOARD_DATA_FAILED:
         return { ...state, dashboardError: true, dashboardSpinner: false };
         break;
      case DASHBOARD_FILTER_INPUT_CHANGE:
         return { ...state, filterInput: payload };
         break;
      case LOGOUT_SUCCESS:
         return { ...state, filterInput: '' };
         break;
      case GET_NOTIFICATON_SUCCESS:
         return { ...state, badge: 0 };
         break;
      default:
         return state;
   }
};
