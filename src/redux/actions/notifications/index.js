import messaging from '@react-native-firebase/messaging';
import {
   ASSIGN_FCM_TOKEN,
   RECEIVE_NOTIFICATION,
   GET_NOTIFICATION_FAILED,
   GET_NOTIFICATON_SUCCESS,
   GET_NOTIFICATION_LOADER,
} from './types';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';
import Api from '../../../apis';
import { showFlashMessage } from '../../../utils/flashMessage';
import {
   WAIT_PERVIEW,
   LATE_APPROVAL,
   LATE_PERVIEW,
} from '../../../utils/complainsStutus';
import {
   INDICATOR_GREEN,
   INDICATOR_RED,
   INDICATOR_YELLOW,
} from '../../../constants/colors';
import moment from 'moment';
export const handleRecieveNotification = () => {
   messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!');
   });
};

export const getAllNotifications = () => async dispatch => {
   try {
      dispatch({ type: GET_NOTIFICATION_LOADER, payload: true });
      const userId = await AsyncStorage.getItem('userId');
      let getNotificationResponse = await getAllDataFromFireStore(userId);
      dispatch({
         type: GET_NOTIFICATON_SUCCESS,
         payload: getNotificationResponse,
      });

      await firestore()
         .collection('users')
         .doc(userId)
         .update({ notificationBadge: 0 });
      PushNotification.cancelAllLocalNotifications();
   } catch (error) {
      console.log('get notification error', error);
      dispatch({ type: GET_NOTIFICATION_FAILED });
   }
};

const getAllDataFromFireStore = async userId => {
   let data = [];
   await firestore()
      .collection(`UserNotification`)
      .get()
      .then(querySnapshot => {
         querySnapshot.forEach(doc => {
            // console.log(doc._data);
            data.push(doc._data);
         });
      })
      .catch(e => console.log('get firedata error', e));
   return data
      .filter(item => item.userId == userId)
      .filter(item => item.StatusNameEn);
};

export const onNotificationPressed = (
   complainId,
   navigation,
   CreatedOn
) => async () => {
   try {
      const getComplainById = await Api.get(`Complians/${complainId}`);
      const {
         data: {
            Comment,
            ComplianImages,
            ComplianSpareParts,
            ComplianType,
            ContractorId,
            ContractorName,
            Covered,
            CretaedBy,
            DamageType,
            Id,
            PlateNumber,
            StatusId,
            StatusNameAr,
            UpdatedBy,
            UpdatedOn,
            VehicleId,
            VehicleType,
         },
      } = getComplainById.data;

      let data = {
         complainDate: moment(CreatedOn, 'YYYY-MM-DD hh:mm:ss').format(
            'DD/MM/YYYY'
         ),
         complainNumber: Id,
         complainStatus: StatusId,
         contractorNumber: ContractorName,
         covered: Covered,
         images: ComplianImages,
         indicatorColor:
            StatusId == 4
               ? INDICATOR_GREEN
               : StatusId == 5 || StatusId == 1
               ? INDICATOR_RED
               : INDICATOR_YELLOW,
         spareParts: ComplianSpareParts,
         vehicleCode: PlateNumber,
         vehicleNumber: VehicleId,
         vehicleType: VehicleType,
      };

      switch (+StatusId) {
         case WAIT_PERVIEW:
         case LATE_PERVIEW:
            navigation.navigate('waitView', { data });
            break;
         default:
            navigation.navigate('waitAprroval', { data, StatusId });
            break;
      }
   } catch (error) {
      console.log('got to gomplainError', error);
      showFlashMessage('danger', 'حدث خطأ برجاء المحاوله مره أخري');
   }
};
