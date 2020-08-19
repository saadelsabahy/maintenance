import {
   GET_NOTIFICATION_FAILED,
   GET_NOTIFICATON_SUCCESS,
   GET_NOTIFICATION_LOADER,
   RECEIVE_NOTIFICATION,
} from '../../actions/notifications/types';

const initialState = {
   notifications: [],
   getNotificationLoader: false,
   getNotificationError: null,
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case GET_NOTIFICATION_FAILED:
         return {
            ...state,
            getNotificationLoader: null,
            getNotificationError: true,
         };
         break;
      case GET_NOTIFICATON_SUCCESS:
         return {
            ...initialState,
            notifications: payload,
         };
         break;
      case GET_NOTIFICATION_LOADER:
         return {
            ...initialState,
            getNotificationLoader: payload,
         };
         break;
      case RECEIVE_NOTIFICATION:
         return {
            ...state,
            notifications: payload,
            getNotificationLoader: false,
         };
         break;
      default:
         return state;
   }
};
