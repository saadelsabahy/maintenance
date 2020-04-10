import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
   WHITE_COLOR,
   SECONDART_COLOR,
   MAIN_COLOR,
} from '../../constants/colors';
import DashBoardItem from '../../components/DashboardItem';
import DashboardHeader from './DashboardHeader';

const DashBoard = ({ navigation }) => {
   const onDashboardItemPressed = text => {
      navigation.navigate('DashboardComplains', { headerText: text });
   };
   return (
      <View style={styles.container}>
         <DashboardHeader navigation={navigation} />
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
                  onDashboardItemPressed={onDashboardItemPressed}
               />
               <DashBoardItem
                  text={'قيد التعميد'}
                  number={'20'}
                  icon={'stopwatch'}
                  iconTtype={'entypo'}
                  onDashboardItemPressed={onDashboardItemPressed}
               />
               <DashBoardItem
                  text={'قيد التنفيذ'}
                  number={'100'}
                  icon={'gears'}
                  iconTtype={'font-awesome'}
                  onDashboardItemPressed={onDashboardItemPressed}
               />
               <DashBoardItem
                  text={'تم الحل'}
                  number={'30'}
                  icon={'checkcircleo'}
                  iconTtype={'antdesign'}
                  onDashboardItemPressed={onDashboardItemPressed}
               />
               <DashBoardItem
                  text={'مرفوض'}
                  number={'10'}
                  icon={'closecircleo'}
                  iconTtype={'antdesign'}
                  onDashboardItemPressed={onDashboardItemPressed}
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
   itemsWrapper: {
      flex: 1,
      backgroundColor: SECONDART_COLOR,
      borderTopStartRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
   },
});

export default DashBoard;
