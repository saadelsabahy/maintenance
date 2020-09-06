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
import { firebase } from '@react-native-firebase/messaging';
import { Keyboard } from 'react-native';
import firestore from '@react-native-firebase/firestore';
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
   Keyboard.dismiss();
   const { userName, userPassword } = getState().Auth;
   if (!userName || !userPassword) {
      showFlashMessage('warning', 'برجاء إخال البيانات');
   } else if (userName.length < 2) {
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
            `http://192.168.50.123:5565/UMMaintenanceAPI/api/user/Authenticate?userName=${userName}&password=${userPassword}&encrypteddata=${false}`,
            { timeout: 20000 }
         );

         if (loginResponse.data) {
            await addFcmToFireStore(loginResponse.data, dispatch);
         } else {
            console.log('login problem', loginResponse.data);
            showFlashMessage(
               'danger',
               'حدث خطأ اثناء تسجيل الدخول برجاء المحاوله مره اخري'
            );
            dispatch({ type: LOGIN_FAILED });
         }
      } catch (error) {
         console.log('login error', error);
         showFlashMessage(
            'danger',
            'حدث خطأ اثناء تسجيل الدخول برجاء المحاوله مره اخري'
         );
         dispatch({ type: LOGIN_FAILED });
      }
   }
};

export const onLogoutPressed = () => async dispatch => {
   await removefcmToken();
   await AsyncStorage.clear();
   await firebase.messaging().deleteToken();
   /*  await purgeStoredState(); */
   dispatch({ type: LOGOUT_SUCCESS });
};

const addFcmToFireStore = async (data, dispatch) => {
   const fcmToken = await AsyncStorage.getItem('fcmToken');
   console.log('dt..', data);
   try {
      await firestore()
         .collection('users')
         .doc(`${data.Id}`)
         .update({
            notificationBadge: firestore.FieldValue.increment(0),
            fcmToken: firestore.FieldValue.arrayUnion(fcmToken),
            userId: data.Id,
            locationId: data.LocationId,
         });
      await AsyncStorage.multiSet([
         ['userId', `${data.Id}`],
         ['userType', `${data.LocationId}`],
         ['userName', `${data.FirstName} ${data.LastName}`],
      ]);
      dispatch({ type: LOGIN_SUCCESS });
   } catch (error) {
      console.log('add to fire store error', error);
      showFlashMessage(
         'danger',
         'حدث خطأ اثناء تسجيل الدخول برجاء المحاوله مره اخري'
      );
      dispatch({ type: LOGIN_FAILED });
   }
};

const removefcmToken = async () => {
   const userId = await AsyncStorage.getItem('userId');
   const oldFcmToken = await AsyncStorage.getItem('fcmToken');
   firestore()
      .collection(`users`)
      .doc(`${userId}`)
      .update({ fcmToken: firestore.FieldValue.arrayRemove(oldFcmToken) })
      .catch(e => console.log('get firedata error', e));
};
