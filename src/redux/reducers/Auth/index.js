import {
   LOGIN_USER_NAME_CHANGE,
   LOGIN_USER_PASSWORD_CHANGE,
   LOGIN_SPINNER,
   LOGIN_SUCCESS,
   LOGIN_FAILED,
   LOGOUT_SUCCESS,
} from '../../actions/Auth/AuthTypes';

const initialState = {
   userName: '',
   userPassword: '',
   userNameError: '',
   userPasswordError: '',
   loginSpinner: false,
   loginError: false,
   logedIn: false,
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case LOGIN_USER_NAME_CHANGE:
         return { ...state, userName: payload };
         break;
      case LOGIN_USER_PASSWORD_CHANGE:
         return { ...state, userPassword: payload };
         break;

      case LOGIN_SPINNER:
         return { ...state, loginSpinner: true, loginError: false };
         break;

      case LOGIN_SUCCESS:
         return { ...initialState, logedIn: !state.logedIn };
         break;

      case LOGIN_FAILED:
         return { ...state, loginSpinner: false, loginError: true };
         break;
      case LOGOUT_SUCCESS:
         return { ...initialState, logedIn: !state.logedIn };
      default:
         return state;
   }
};
