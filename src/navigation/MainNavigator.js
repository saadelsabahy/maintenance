import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './Drawer';
import Login from '../screens/Login';
import AsyncStorage from '@react-native-community/async-storage';
import Splash from '../screens/Splash';
import { useSelector } from 'react-redux';
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
const AppNavigation = ({ screenProps }) => {
   const logedIn = useSelector(state => state.Auth.logedIn);
   const [token, settoken] = useState(
      AsyncStorage.getItem('userId', (err, res) => settoken(res))
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
      <NavigationContainer screenProps={screenProps}>
         {showSplash ? (
            <Splash />
         ) : token ? (
            <DrawerNavigator />
         ) : (
            <LoginStack />
         )}
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
