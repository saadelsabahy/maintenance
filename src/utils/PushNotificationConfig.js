import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
export const PushNotificationConfigration = navigation => {
   PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
         console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function(notification) {
         console.log('NOTIFICATION:', notification);
         if (navigation) {
            navigation.navigate('Notificatons');
         } else {
            return;
         }
         // process the notification

         // (required) Called when a remote is received or opened, or local notification is opened
         notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function(notification) {
         console.log('ACTION:', notification.action);
         console.log('NOTIFICATION:', notification);

         // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function(err) {
         console.log(err.message, err);
      },

      permissions: {
         alert: true,
         badge: true,
         sound: true,
      },

      popInitialNotification: true,

      requestPermissions: true,
   });
};
