import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './Drawer';
import Login from '../screens/Login';
import AsyncStorage from '@react-native-community/async-storage';
import Splash from '../screens/Splash';
import {useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Login'}>
      <Stack.Screen name={'Login'} component={Login} />
    </Stack.Navigator>
  );
};
const AppNavigation = ({initialRouteName}) => {
  const logedIn = useSelector(state => state.Auth.logedIn);
  const navigationRef = React.useRef(null);
  const [token, settoken] = useState(
    AsyncStorage.getItem('userId', (err, res) => settoken(res)),
  );
  useEffect(() => {
    const SplashTimeOut = setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    handleclickNotification();
    return () => {
      clearTimeout(SplashTimeOut);
    };
  }, []);

  useEffect(() => {
    return () => {};
  }, []);
  const handleclickNotification = async navigation => {
    messaging().onMessage(async remoteMessage => {
      console.log('open', remoteMessage);
    });

    // app in background

    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log('backGround', remoteMessage);
      navigationRef.current?.navigate('Notificatons');
    });

    messaging()
      .getInitialNotification()
      .then(async Notification => {
        if (Notification) {
          const {
            messageId,
            notification: {body, title, data},
          } = Notification;
          console.log(Notification);
          const lastOpenFromClosedId = await AsyncStorage.getItem(
            'lastNotification',
          );

          if (messageId !== lastOpenFromClosedId) {
            navigationRef.current?.navigate('Notificatons');
            await AsyncStorage.setItem('lastNotification', messageId);
            console.log('closed');
          } else {
            console.log('returned');

            return;
          }
        }
      });
  };

  return (
    <NavigationContainer ref={navigationRef}>
      {token ? <DrawerNavigator /> : <LoginStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;
/*
  ) : token ? (
            <DrawerNavigator />
         ) : (
            <LoginStack />
         )
*/
