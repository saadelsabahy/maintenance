import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, Icon, CustomText } from '../../components';
import {
   WHITE_COLOR,
   SECONDART_COLOR,
   MAIN_COLOR,
} from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import DashBoardItem from '../../components/DashboardItem';

const DashBoard = ({ navigation }) => {
   return (
      <View style={styles.container}>
         <Header>
            <View>
               <Icon
                  name={'menu'}
                  type={'material-community'}
                  color={WHITE_COLOR}
                  onPress={() => navigation.toggleDrawer()}
                  iconContainerStyle={{ flex: 1 }}
               />
            </View>

            <View style={styles.headerStartRow}>
               <Icon
                  name={'filter-outline'}
                  type={'material-community'}
                  color={WHITE_COLOR}
                  iconContainerStyle={{ flex: 1 }}
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
                     color={WHITE_COLOR}
                     iconContainerStyle={{ flex: 1 }}
                  />
               </View>
            </View>
         </Header>
         <View
            style={{
               alignSelf: 'center',
               width: '100%',
               height: '15%',
            }}>
            <View
               style={{
                  flexDirection: 'row',
                  width: '95%',
                  height: '100%',
                  alignSelf: 'center',
               }}>
               <View
                  style={{
                     flex: 1,
                     alignItems: 'center',
                  }}>
                  <CustomText
                     text={'تطبيق الصيانات'}
                     textStyle={{
                        color: WHITE_COLOR,
                        fontSize: responsiveFontSize(2.7),
                     }}
                  />
               </View>
               <View style={{ top: -15 }}>
                  <CustomText
                     text={'أخر تحديث'}
                     textStyle={{
                        color: WHITE_COLOR,
                        fontSize: responsiveFontSize(1.5),
                     }}
                  />
                  <CustomText
                     text={'6.15 مساء'}
                     textStyle={{
                        color: WHITE_COLOR,
                        fontSize: responsiveFontSize(1.5),
                     }}
                  />
               </View>
            </View>
         </View>
         <View style={styles.itemsWrapper}>
            <View
               style={{
                  width: '100%',
                  height: '100%',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-evenly',
                  top: '-8%',
               }}>
               <DashBoardItem
                  text={'قيد المعاينه'}
                  number={'55'}
                  icon={'download'}
                  iconTtype={'antdesign'}
               />
               <DashBoardItem
                  text={'قيد التعميد'}
                  number={'20'}
                  icon={'stopwatch'}
                  iconTtype={'entypo'}
               />
               <DashBoardItem
                  text={'قيد التنفيذ'}
                  number={'100'}
                  icon={'gears'}
                  iconTtype={'font-awesome'}
               />
               <DashBoardItem
                  text={'تم الحل'}
                  number={'30'}
                  icon={'checkcircleo'}
                  iconTtype={'antdesign'}
               />
               <DashBoardItem
                  text={'مرفوض'}
                  number={'10'}
                  icon={'closecircleo'}
                  iconTtype={'antdesign'}
               />
            </View>
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: MAIN_COLOR,
   },
   headerStartRow: {
      flex: 0.3,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   itemsWrapper: {
      flex: 1,
      backgroundColor: SECONDART_COLOR,
      borderTopStartRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
   },
});

export default DashBoard;
