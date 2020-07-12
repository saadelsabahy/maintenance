import React, { useState, useEffect } from 'react';
import {
   View,
   Text,
   StyleSheet,
   ImageBackground,
   ScrollView,
} from 'react-native';
import {
   WHITE_COLOR,
   SECONDART_COLOR,
   MAIN_COLOR,
   SURFACE_COLOR,
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
import {
   getDashBoardData,
   onDashboardFilterChage,
} from '../../redux/actions/Dashboard';
import NetInfo from '@react-native-community/netinfo';
import DashboardBackground from '../../assets/images/app_bg.png';

const DashBoard = ({ navigation }) => {
   const isFocused = useIsFocused();
   const [netConnected, setNetConnected] = useState(null);

   const {
      dashboardSpinner,
      dashboardError,
      dashboardData,
      lastUpdate,
      filterInput,
   } = useSelector(state => ({
      dashboardSpinner: state.Dashboard.dashboardSpinner,
      dashboardError: state.Dashboard.dashboardError,
      dashboardData: state.Dashboard.dashboardData,
      lastUpdate: state.Dashboard.lastUpdate,
      filterInput: state.Dashboard.filterInput,
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
      if (isFocused) {
         getDashboardData();
      } else {
         return;
      }
      return () => {
         unsubscribe();
      };
   }, [netConnected, isFocused]);
   const getDashboardData = () => {
      if (netConnected) {
         dispatch(getDashBoardData());
      } else {
         return;
      }
   };
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
      <ImageBackground
         source={DashboardBackground}
         style={styles.container}
         resizeMode="stretch">
         {!netConnected && renderNetSignOffline()}
         <DashboardHeader
            navigation={navigation}
            onFilterPressed={() => setshowFilterModal(!showFilterModal)}
            lastUpdate={lastUpdate}
            onRefreshPressed={() => getDashboardData()}
         />
         <View style={styles.itemsWrapper}>
            {dashboardSpinner || dashboardError ? (
               <LoaderAndRetry
                  loading={dashboardSpinner}
                  error={dashboardError}
                  onRetryPressed={() => getDashboardData()}
               />
            ) : (
               <View
                  style={{
                     width: '100%',
                     height: '100%',
                     top: '-5%',
                  }}>
                  <ScrollView
                     style={{ flex: 1 }}
                     overScrollMode="never"
                     contentContainerStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-evenly',
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
                        number={isNaN(dashboardData[1]) ? 0 : dashboardData[1]}
                        icon={'stopwatch'}
                        iconTtype={'entypo'}
                        onDashboardItemPressed={headerName =>
                           onDashboardItemPressed(headerName, 2)
                        }
                     />
                     <DashBoardItem
                        text={'قيد التنفيذ'}
                        number={isNaN(dashboardData[2]) ? 0 : dashboardData[2]}
                        icon={'gears'}
                        iconTtype={'font-awesome'}
                        onDashboardItemPressed={headerName =>
                           onDashboardItemPressed(headerName, 3)
                        }
                     />
                     <DashBoardItem
                        text={'تم الحل'}
                        number={isNaN(dashboardData[3]) ? 0 : dashboardData[3]}
                        icon={'checkcircleo'}
                        iconTtype={'antdesign'}
                        onDashboardItemPressed={headerName =>
                           onDashboardItemPressed(headerName, 4)
                        }
                     />
                     <DashBoardItem
                        text={'مرفوض'}
                        number={isNaN(dashboardData[4]) ? 0 : dashboardData[4]}
                        icon={'closecircleo'}
                        iconTtype={'antdesign'}
                        onDashboardItemPressed={headerName =>
                           onDashboardItemPressed(headerName, 5)
                        }
                     />
                     <DashBoardItem
                        text={'متأخر المعاينه'}
                        number={isNaN(dashboardData[4]) ? 0 : dashboardData[4]}
                        icon={'eye-slash'}
                        iconTtype={'font-awesome'}
                        onDashboardItemPressed={headerName =>
                           onDashboardItemPressed(headerName, 5)
                        }
                     />
                     <DashBoardItem
                        text={'متأخر الاعتماد'}
                        number={isNaN(dashboardData[4]) ? 0 : dashboardData[4]}
                        icon={'thumbs-up'}
                        iconTtype={'feather'}
                        onDashboardItemPressed={headerName =>
                           onDashboardItemPressed(headerName, 5)
                        }
                     />
                     <DashBoardItem
                        text={'متأخر التنفيذ'}
                        number={isNaN(dashboardData[4]) ? 0 : dashboardData[4]}
                        icon={'progress-wrench'}
                        iconTtype={'material-community'}
                        onDashboardItemPressed={headerName =>
                           onDashboardItemPressed(headerName, 5)
                        }
                     />
                  </ScrollView>
               </View>
            )}
         </View>
         <DashboardFilter
            isModalVisible={showFilterModal}
            onBackdropPress={() => setshowFilterModal(!showFilterModal)}
            contructorId={filterInput}
            onContructorIdCgange={text =>
               dispatch(onDashboardFilterChage(text))
            }
            onDashboardSearchFilterPressed={() => {
               dispatch(getDashBoardData());
               setshowFilterModal(!showFilterModal);
            }}
         />
      </ImageBackground>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: SURFACE_COLOR,
   },
   itemsWrapper: {
      flex: 1,
      borderTopStartRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
   },
});

export default DashBoard;
