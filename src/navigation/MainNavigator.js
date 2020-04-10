import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './Drawer';

const AppNavigation = () => {
   return (
      <NavigationContainer>
         <DrawerNavigator />
      </NavigationContainer>
   );
};

export default AppNavigation;
