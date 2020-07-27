import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import {
   WHITE_COLOR,
   SECONDART_COLOR,
   MAIN_COLOR,
   HEADER_ICONS_COLOR,
} from '../../constants/colors';
import { Header, Icon, CustomText } from '../../components';

const DashboardHeader = ({
   navigation,
   onFilterPressed,
   onRefreshPressed,
   lastUpdate,
   onNotificationPressed,
}) => {
   return (
      <View style={{ width: '100%', height: '22%' }}>
         <Header headerWrapperStyle={styles.headerIconsContainer}>
            <View style={styles.headerStartRow}>
               <Icon
                  name={'menu'}
                  type={'material-community'}
                  color={HEADER_ICONS_COLOR}
                  onPress={() => navigation.toggleDrawer()}
                  iconContainerStyle={{ flex: 1 }}
               />
               <Icon
                  name={'bell-outline'}
                  type={'material-community'}
                  color={HEADER_ICONS_COLOR}
                  onPress={onNotificationPressed}
                  iconContainerStyle={{ flex: 1 }}
               />
            </View>
            <View
               style={{
                  flex: 1,
                  alignItems: 'center',
               }}>
               <CustomText
                  text={'تطبيق الصيانات'}
                  textStyle={{
                     color: WHITE_COLOR,
                     fontSize: responsiveFontSize(2.8),
                  }}
               />
            </View>
            <View style={styles.headerStartRow}>
               <Icon
                  name={'filter-outline'}
                  type={'material-community'}
                  color={HEADER_ICONS_COLOR}
                  iconContainerStyle={{ flex: 1 }}
                  onPress={onFilterPressed}
               />

               <View
                  style={{
                     flex: 1,
                     alignItems: 'center',
                     justifyContent: 'center',
                  }}>
                  <Icon
                     name={'autorenew'}
                     type={'material-community'}
                     color={HEADER_ICONS_COLOR}
                     iconContainerStyle={{ flex: 1 }}
                     onPress={onRefreshPressed}
                  />
               </View>
            </View>
         </Header>

         <View
            style={{
               alignSelf: 'center',
               width: '100%',
               height: '68%',
            }}>
            <View
               style={{
                  flexDirection: 'row',
                  width: '95%',
                  height: '100%',
                  alignSelf: 'center',
                  justifyContent: 'flex-end',
               }}>
               <View style={{ top: -15, start: 3 }}>
                  <CustomText
                     text={'أخر تحديث'}
                     textStyle={{
                        color: WHITE_COLOR,
                        fontSize: responsiveFontSize(1.5),
                     }}
                  />
                  <CustomText
                     text={lastUpdate}
                     textStyle={{
                        color: WHITE_COLOR,
                        fontSize: responsiveFontSize(1.5),
                        zIndex: 1000,
                     }}
                  />
               </View>
            </View>
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   headerStartRow: {
      flex: 0.35,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   headerIconsContainer: {
      height: '30%',
   },
});

export default DashboardHeader;
