import {
   LOGIN_USER_NAME_CHANGE,
   LOGIN_USER_PASSWORD_CHANGE,
} from '../../actions/Auth/AuthTypes';

const initialState = {
   loginUserName: '',
   loginUserPassword: '',
   loginUserNameError: '',
   loginUserPasswordError: '',
   loginUserNameError: null,
   loginUserPasswordError: null,
};

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case LOGIN_USER_NAME_CHANGE:
         return { ...state, loginUserName: payload };
         break;
      case LOGIN_USER_PASSWORD_CHANGE:
         return { ...state, loginUserPassword: payload };
         break;
      default:
         return state;
   }
};
