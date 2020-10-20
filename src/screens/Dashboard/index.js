import React, { useState, useEffect } from 'react';
import {
   View,
   Text,
   StyleSheet,
   ImageBackground,
   ScrollView,
   FlatList,
   RefreshControl,
} from 'react-native';
import {
   WHITE_COLOR,
   SECONDART_COLOR,
   MAIN_COLOR,
   SURFACE_COLOR,
   SCREEN_HEIGHT,
} from '../../constants/colors';
import {
   DashBoardItem,
   DashboardFilter,
   LoaderAndRetry,
   CustomText,
   EmptyList,
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
import {
   WAIT_PERVIEW,
   WAIT_APPROVAL,
   WAIT_EXCUTION,
   SOLVED,
   REJECTED,
   LATE_APPROVAL,
   LATE_EXCUTION,
   LATE_PERVIEW,
} from '../../utils/complainsStutus';
import { dashboardInformation } from '../../utils/dashboardData';
import { PushNotificationConfigration } from '../../utils/PushNotificationConfig';
import AsyncStorage from '@react-native-community/async-storage';

const DashBoard = ({ navigation }) => {
   const isFocused = useIsFocused();
   const [netConnected, setNetConnected] = useState(null);
   const [userType, setuserType] = useState(null);
   const [showFilterModal, setshowFilterModal] = useState(false);
   const [refreshing, setrefreshing] = useState(false);

   const {
      dashboardSpinner,
      dashboardError,
      dashboardData,
      lastUpdate,
      filterInput,
      badge,
      contractors,
   } = useSelector(state => ({
      dashboardSpinner: state.Dashboard.dashboardSpinner,
      dashboardError: state.Dashboard.dashboardError,
      dashboardData: state.Dashboard.dashboardData,
      lastUpdate: state.Dashboard.lastUpdate,
      filterInput: state.Dashboard.filterInput,
      badge: state.Dashboard.badge,
      contractors: state.Dashboard.contractors,
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
   }, [netConnected, isFocused, refreshing]);
   const getDashboardData = async () => {
      const LocationId = await AsyncStorage.getItem('userType');
      setuserType(LocationId);
      if (netConnected) {
         await dispatch(
            onDashboardFilterChage(!filterInput ? LocationId : filterInput)
         );

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

   const handleRefresh = async () => {
      setrefreshing(true);

      await getDashBoardData();
      setrefreshing(false);
   };
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
            onNotificationPressed={() => navigation.navigate('Notificatons')}
            notificationNumber={badge}
            userType={userType}
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
                     justifyContent: 'flex-end',
                  }}>
                  <FlatList
                     overScrollMode="never"
                     style={{ flex: 1 }}
                     numColumns={2}
                     contentContainerStyle={{
                        alignItems: 'center',
                        alignSelf: 'center',
                     }}
                     data={dashboardData}
                     keyExtractor={(item, index) => `${item.StatusId}`}
                     renderItem={({ item: { StatusId, Total }, index }) => {
                        return (
                           <DashBoardItem
                              text={dashboardInformation[StatusId].name}
                              number={Total}
                              icon={dashboardInformation[StatusId].image}
                              iconTtype={
                                 dashboardInformation[StatusId].iconType
                              }
                              onDashboardItemPressed={headerName =>
                                 onDashboardItemPressed(headerName, StatusId)
                              }
                           />
                        );
                     }}
                     ListEmptyComponent={
                        <View style={{ height: SCREEN_HEIGHT * 0.75 }}>
                           <EmptyList />
                        </View>
                     }
                     refreshControl={
                        <RefreshControl
                           refreshing={refreshing}
                           onRefresh={handleRefresh}
                           colors={[MAIN_COLOR]}
                        />
                     }
                  />
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
            contractors={contractors}
            selectedContractorId={filterInput}
            userType={userType}
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
