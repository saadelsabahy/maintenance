import {
   LOGIN_USER_NAME_CHANGE,
   LOGIN_USER_PASSWORD_CHANGE,
   LOGIN_SPINNER,
   LOGIN_FAILED,
   LOGIN_SUCCESS,
   LOGOUT_SUCCESS,
} from './AuthTypes';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { showFlashMessage } from '../../../utils/flashMessage';
import Reactotron from 'reactotron-react-native';
import { purgeStoredState } from 'redux-persist';
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

export const onLoginPressed = () => async (dispatch, getState) => {
   const { userName, userPassword } = getState().Auth;
   if (userName.length < 2) {
      showFlashMessage('warning', 'اسم المستخدم لايجب ان يقل عن حرفين');
   } else if (userPassword.length < 6) {
      showFlashMessage(
         'warning',
         'كلمه المرور لايجب ان تقل عن 6 حروف او أرقام'
      );
   } else {
      try {
         dispatch({ type: LOGIN_SPINNER });
         const loginResponse = await axios.get(
            `http://41.39.108.205:5565/UMMaintenanceAPI/api/user/Authenticate?userName=${userName}&password=${userPassword}&encrypteddata=${false}`
            // { timeout: 20000 }
         );
         console.log(loginResponse);

         if (loginResponse.data) {
            Reactotron.log('loginResponse.FirstName', loginResponse);

            await AsyncStorage.multiSet([
               ['userId', `${loginResponse.data.Id}`],
               ['userType', `${loginResponse.data.LocationId}`],
               [
                  'userName',
                  `${loginResponse.data.FirstName} ${
                     loginResponse.data.LastName
                  }`,
               ],
            ]);
            dispatch({ type: LOGIN_SUCCESS });
         } else {
            showFlashMessage(
               'danger',
               'حدث خطأ اثناء تسجيل الدخول برجاء المحاوله مره اخري'
            );
            dispatch({ type: LOGIN_FAILED });
         }
      } catch (error) {
         console.log('login error', error);
         showFlashMessage(
            'warning',
            'حدث خطأ اثناء تسجيل الدخول برجاء المحاوله مره اخري'
         );
         dispatch({ type: LOGIN_FAILED });
      }
   }
};

export const onLogoutPressed = () => async dispatch => {
   await AsyncStorage.clear();
   /*  await purgeStoredState(); */
   dispatch({ type: LOGOUT_SUCCESS });
};
