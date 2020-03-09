import {
   LOGIN_USER_NAME_CHANGE,
   LOGIN_USER_PASSWORD_CHANGE,
} from './AuthTypes';

export const inputsChange = (inputName, inputValue) => {
   switch (inputName) {
      case 'loginName':
         return { type: LOGIN_USER_NAME_CHANGE, payload: inputValue };
         break;

      case 'loginPassword':
         return { type: LOGIN_USER_PASSWORD_CHANGE, payload: inputValue };
         break;
   }
};

export const onLoginPressed = () => async (dispatch, getState) => {};
