import React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashBoard from '../screens/Dashboard';
import Complains from '../screens/ComplainsList';
import CustomDrawer from '../screens/Drawer';
import {
   TEXT_COLOR,
   DRAWER_DIVIDER,
   MAIN_COLOR,
   WHITE_COLOR,
} from '../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { CustomText, Icon } from '../components';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
   const dawerDefaultOptions = (text, iconName, iconType) => ({
      drawerLabel: () => (
         <CustomText
            text={text}
            textStyle={{
               marginStart: 0,
               fontSize: responsiveFontSize(2.5),
            }}
         />
      ),
      drawerIcon: () => (
         <Icon
            name={iconName}
            type={iconType}
            color={WHITE_COLOR}
            iconContainerStyle={{
               flex: 0,
               backgroundColor: MAIN_COLOR,
               width: 45,
               height: 45,
               borderRadius: 45 / 2,
            }}
         />
      ),
   });
   return (
      <Drawer.Navigator
         initialRouteName="DashBoard"
         drawerStyle={{ borderTopEndRadius: 75, overflow: 'hidden' }}
         drawerContent={props => <CustomDrawer {...props} />}
         drawerContentOptions={{
            activeTintColor: MAIN_COLOR,
            inactiveTintColor: TEXT_COLOR,
            labelStyle: {
               backgroundColor: 'red',
            },
            itemStyle: {
               borderBottomColor: DRAWER_DIVIDER,
               borderBottomWidth: 1,
               height: 55,
               width: '100%',
               justifyContent: 'center',
               margin: 0,
               marginStart: 0,
               marginBottom: 0,
               marginTop: 0,
            },
         }}>
         <Drawer.Screen
            name="DashBoard"
            component={DashBoard}
            options={{
               ...dawerDefaultOptions(
                  'الرئيسيه',
                  'home-outline',
                  'material-community'
               ),
            }}
         />
         <Drawer.Screen
            name="Complains"
            component={Complains}
            options={{
               ...dawerDefaultOptions(
                  'البلاغات',
                  'file-multiple',
                  'material-community'
               ),
            }}
         />
      </Drawer.Navigator>
   );
};

export default DrawerNavigator;
