import messaging, {
   AuthorizationStatus,
} from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

export const getFcmToken = async () => {
   const enabled = await messaging().hasPermission();
   console.log('enabl', enabled);

   if (enabled > 0) {
      getToken();
   } else {
      try {
         messaging()
            .requestPermission({
               badge: true,
               sound: true,
               alert: true,
            })
            .then(async () => {
               getToken();
            })
            .catch((e) => {
               console.log('permission error', e);
            });
      } catch (e) {
         console.log('user refuse permission');
      }
   }
};

const getToken = async () => {
   const fcmToken = await messaging().getToken();
   await AsyncStorage.setItem('fcmToken', fcmToken);
   console.log('fcmToken', fcmToken);
};
