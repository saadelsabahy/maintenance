import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { getAllNotifications } from '../redux/actions';
export const PushNotificationConfigration = dispatch => {
   PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
         console.log('TOKEN:', token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
         console.log('NOTIFICATION:', notification);
         dispatch(getAllNotifications());
         // process the notification here

         // required on iOS only
         notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // Android only
      senderID: '913086430843',
      // iOS only
      permissions: {
         alert: true,
         badge: true,
         sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
   });
};
