import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
   WHITE_COLOR,
   SECONDART_COLOR,
   MAIN_COLOR,
} from '../../constants/colors';
import {
   DashBoardItem,
   DashboardFilter,
   LoaderAndRetry,
   CustomText,
} from '../../components';
import DashboardHeader from './DashboardHeader';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getDashBoardData } from '../../redux/actions/Dashboard';
import NetInfo from '@react-native-community/netinfo';

const DashBoard = ({ navigation }) => {
   const isFocused = useIsFocused();
   const [netConnected, setNetConnected] = useState(null);

   const {
      dashboardSpinner,
      dashboardError,
      dashboardData,
      lastUpdate,
   } = useSelector(state => ({
      dashboardSpinner: state.Dashboard.dashboardSpinner,
      dashboardError: state.Dashboard.dashboardError,
      dashboardData: state.Dashboard.dashboardData,
      lastUpdate: state.Dashboard.lastUpdate,
   }));
   const dispatch = useDispatch();
   const onDashboardItemPressed = (text, distination) => {
      navigation.navigate('DashboardComplains', {
         headerText: text,
         distination,
      });
   };
   useEffect(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
         setNetConnected(state.isConnected);
      });
      dispatch(getDashBoardData());
      return () => {
         unsubscribe();
      };
   }, []);
   const renderNetSignOffline = () => (
      <View
         style={{
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'red',
         }}>
         <CustomText
            text={'لايوجد اتصال بالإنترنت'}
            textStyle={{ color: WHITE_COLOR }}
         />
      </View>
   );
   const [showFilterModal, setshowFilterModal] = useState(false);
   return (
      <View style={styles.container}>
         {!netConnected && renderNetSignOffline()}
         <DashboardHeader
            navigation={navigation}
            onFilterPressed={() => setshowFilterModal(!showFilterModal)}
            lastUpdate={lastUpdate}
            onRefreshPressed={() => dispatch(getDashBoardData())}
         />
         <View style={styles.itemsWrapper}>
            {dashboardSpinner || dashboardError ? (
               <LoaderAndRetry
                  loading={dashboardSpinner}
                  error={dashboardError}
                  onRetryPressed={() => dispatch(getDashBoardData())}
               />
            ) : (
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
                     number={isNaN(dashboardData[0]) ? 0 : dashboardData[0]}
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
            )}
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
