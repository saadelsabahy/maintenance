import React, { useState, useEffect } from 'react';
import {
   View,
   Text,
   StyleSheet,
   Image,
   ScrollView,
   TouchableOpacity,
   SafeAreaView,
   ImageBackground,
} from 'react-native';
import {
   MAIN_COLOR,
   SECONDART_COLOR,
   WHITE_COLOR,
   DRAWER_DIVIDER,
   SURFACE_COLOR,
   MAIN_RED_COLOR,
} from '../../constants/colors';
import {
   createDrawerNavigator,
   DrawerContentScrollView,
   DrawerItemList,
   DrawerItem,
} from '@react-navigation/drawer';
import { Icon, CustomText } from '../../components';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { onLogoutPressed } from '../../redux/actions';
import Svg, { Path } from 'react-native-svg';
const CustomDrawer = props => {
   const dispatch = useDispatch();
   const [userName, setuserName] = useState('');
   useEffect(() => {
      getName();
      return () => {};
   }, []);
   const getName = async () => {
      let name = await AsyncStorage.getItem('userName');

      setuserName(name);
   };
   return (
      <SafeAreaView style={styles.container}>
         {/*  <Svg
            width={'120%'}
            height={'200%'}
            viewBox="0 0 762 2119"
            style={{
               transform: [{ rotateY: '-180deg' }],
               position: 'absolute',
            }}
            fill={SURFACE_COLOR}
            {...props}>
            <Path d="M0 1059.5V2119h762V203.5L660.2 101.7 558.5 0H0v1059.5z" />
         </Svg> */}

         {/* <ImageBackground
            source={require('../../assets/images/side-menu.png')}
            style={styles.backgroundImage}
            resizeMode="stretch"
            resizeMethod="scale"
         /> */}
         <View style={styles.DrawerHeader}>
            <ImageBackground
               source={require('../../assets/images/drawer_header.png')}
               style={styles.backgroundImage}
               resizeMode="stretch"
               resizeMethod="scale"
            />
            {/* <View style={styles.editIconContainer}>
               <Icon
                  name={'square-edit-outline'}
                  type={'material-community'}
                  color={WHITE_COLOR}
                  iconContainerStyle={{
                     flex: 0.9,
                     alignItems: 'flex-start',
                  }}
               />
            </View> */}
            <View style={styles.profileContainer}>
               <Image
                  source={require('../../assets/images/boy.png')}
                  style={{
                     width: 100,
                     height: 100,
                     borderRadius: 50,
                     resizeMode: 'cover',
                  }}
               />
               <CustomText text={'اهلا بك'} textStyle={styles.headerText} />
               <CustomText text={userName} textStyle={styles.headerText} />
            </View>
            <View
               style={{
                  ...styles.editIconContainer,
                  width: '95%',
                  position: 'absolute',
                  bottom: 5,
               }}>
               <Icon
                  name={'logout'}
                  type={'material-community'}
                  color={WHITE_COLOR}
                  iconContainerStyle={{
                     flex: 1,
                     alignItems: 'flex-end',
                  }}
                  onPress={() => {
                     dispatch(onLogoutPressed());
                     props.navigation.closeDrawer();
                  }}
               />
            </View>
         </View>
         <SafeAreaView
            style={{
               flex: 1,
               marginTop: 0,
               marginVertical: 0,
               paddingVertical: 0,
               paddingTop: 0,
               backgroundColor: '#3D3D3D',
            }}>
            <DrawerContentScrollView
               {...props}
               style={{
                  marginTop: 0,
                  marginVertical: 0,
                  paddingVertical: 0,
                  paddingTop: 0,
               }}>
               <DrawerItemList {...props} />
            </DrawerContentScrollView>
         </SafeAreaView>
      </SafeAreaView>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,

      // backgroundColor: SECONDART_COLOR,
   },
   DrawerHeader: {
      // backgroundColor: MAIN_COLOR,
      width: '100%',
      height: '35%',
      // borderBottomStartRadius: 50,
      marginBottom: 0,
   },
   editIconContainer: {
      width: '90%',
      height: '20%',
      justifyContent: 'center',
      marginBottom: 0,
   },
   profileContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   headerText: {
      color: WHITE_COLOR,
   },
   itemContainer: {
      height: 50,
      alignItems: 'flex-end',
      flexDirection: 'row',
      borderBottomColor: DRAWER_DIVIDER,
      borderBottomWidth: 1,
   },
   iconContainer: {
      backgroundColor: 'transparent',
      justifyContent: 'flex-end',
   },
   backgroundImage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      // transform: [{ rotateY: '-180deg' }],
   },
});

export default CustomDrawer;
