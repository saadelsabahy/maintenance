import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
   WHITE_COLOR,
   SECONDART_COLOR,
   MAIN_COLOR,
} from '../../constants/colors';
import { DashBoardItem, DashboardFilter } from '../../components';
import DashboardHeader from './DashboardHeader';

const DashBoard = ({ navigation }) => {
   const onDashboardItemPressed = (text, distination) => {
      navigation.navigate('DashboardComplains', {
         headerText: text,
         distination,
      });
   };
   const [showFilterModal, setshowFilterModal] = useState(false);
   return (
      <View style={styles.container}>
         <DashboardHeader
            navigation={navigation}
            onFilterPressed={() => setshowFilterModal(!showFilterModal)}
         />
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
                  onDashboardItemPressed={headerName =>
                     onDashboardItemPressed(headerName, 1)
                  }
               />
               <DashBoardItem
                  text={'قيد التعميد'}
                  number={'20'}
                  icon={'stopwatch'}
                  iconTtype={'entypo'}
                  onDashboardItemPressed={headerName =>
                     onDashboardItemPressed(headerName, 2)
                  }
               />
               <DashBoardItem
                  text={'قيد التنفيذ'}
                  number={'100'}
                  icon={'gears'}
                  iconTtype={'font-awesome'}
                  onDashboardItemPressed={headerName =>
                     onDashboardItemPressed(headerName, 3)
                  }
               />
               <DashBoardItem
                  text={'تم الحل'}
                  number={'30'}
                  icon={'checkcircleo'}
                  iconTtype={'antdesign'}
                  onDashboardItemPressed={headerName =>
                     onDashboardItemPressed(headerName, 4)
                  }
               />
               <DashBoardItem
                  text={'مرفوض'}
                  number={'10'}
                  icon={'closecircleo'}
                  iconTtype={'antdesign'}
                  onDashboardItemPressed={headerName =>
                     onDashboardItemPressed(headerName, 5)
                  }
               />
            </View>
         </View>
         <DashboardFilter
            isModalVisible={showFilterModal}
            onBackdropPress={() => setshowFilterModal(!showFilterModal)}
         />
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
