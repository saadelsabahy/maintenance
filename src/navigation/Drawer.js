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
   SCREEN_HEIGHT,
   SCREEN_WIDTH,
} from '../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { CustomText, Icon } from '../components';

const Drawer = createDrawerNavigator();
import { createStackNavigator } from '@react-navigation/stack';
import ComplainsDetailes from '../screens/cmplainsDetails';
import WaitingView from '../screens/waitView';
import WaitApproval from '../screens/WaitingApproval';

const Stack = createStackNavigator();

const DashboardStack = () => {
   return (
      <Stack.Navigator
         screenOptions={{
            headerShown: false,
         }}
         initialRouteName={'Dashboard'}>
         <Stack.Screen name={'Dashboard'} component={DashBoard} />
         {/*  <Stack.Screen
            name={'waitApprovalComplains'}
            component={WaitApprovalList}
         /> */}
         <Stack.Screen name={'DashboardComplains'} component={Complains} />
         <Stack.Screen name={'waitView'} component={WaitingView} />
         <Stack.Screen name={'waitAprroval'} component={WaitApproval} />
      </Stack.Navigator>
   );
};

const ComplainsStack = () => {
   return (
      <Stack.Navigator
         screenOptions={{
            headerShown: false,
         }}
         initialRouteName={Complains}>
         <Stack.Screen name={'Complains'} component={Complains} />
         <Stack.Screen
            name={'ComplainDetailes'}
            component={ComplainsDetailes}
         />
      </Stack.Navigator>
   );
};
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
               width: Math.round(SCREEN_HEIGHT / 2 + SCREEN_WIDTH / 2) / 10,
               height: Math.round(SCREEN_HEIGHT / 2 + SCREEN_WIDTH / 2) / 10,
               borderRadius: Math.round(SCREEN_HEIGHT / 2 + SCREEN_WIDTH / 2),
            }}
         />
      ),
   });
   return (
      <Drawer.Navigator
         initialRouteName="DashBoardStack"
         drawerStyle={{
            borderTopEndRadius: 75,
            overflow: 'hidden',
            width: '75%',
         }}
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
               height: '50%',
               width: '100%',
               justifyContent: 'center',
               margin: 0,
               marginStart: 0,
               marginBottom: 0,
               marginTop: 0,
            },
         }}>
         <Drawer.Screen
            name="DashBoardStack"
            component={DashboardStack}
            options={{
               ...dawerDefaultOptions(
                  'الرئيسيه',
                  'home-outline',
                  'material-community'
               ),
            }}
         />
         <Drawer.Screen
            name="ComplainsStack"
            component={ComplainsStack}
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
