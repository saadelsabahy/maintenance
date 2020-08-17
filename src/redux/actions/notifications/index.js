import messaging from '@react-native-firebase/messaging';
export const handleRecieveNotification = () => {
   messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!');
   });
};
