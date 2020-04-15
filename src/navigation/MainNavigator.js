import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './Drawer';
import Login from '../screens/Login';
import AsyncStorage from '@react-native-community/async-storage';
import Splash from '../screens/Splash';
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
const AppNavigation = () => {
   const [token, settoken] = useState(
      AsyncStorage.getItem('userToken', (err, res) => settoken(res))
   );
   const [showSplash, setshowSplash] = useState(true);
   useEffect(() => {
      const SplashTimeOut = setTimeout(() => {
         setshowSplash(false);
      }, 1000);
      return () => {
         clearTimeout(SplashTimeOut);
      };
   }, []);
   return (
      <NavigationContainer>
         {/*  <LoginStack /> */}
         {/*   <DrawerNavigator /> */}
         {showSplash ? <Splash /> : <DrawerNavigator />}
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
