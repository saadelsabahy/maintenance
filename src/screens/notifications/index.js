import React, { useState, useEffect } from 'react';
import {
   View,
   Text,
   StyleSheet,
   ImageBackground,
   FlatList,
   RefreshControl,
   ActivityIndicator,
} from 'react-native';
import BackgroundImage from '../../assets/images/app_bg.png';
import {
   SURFACE_COLOR,
   HEADER_ICONS_COLOR,
   WHITE_COLOR,
   SCREEN_HEIGHT,
} from '../../constants/colors';
import {
   Header,
   Icon,
   CustomText,
   NotificationCard,
   EmptyList,
   LoaderAndRetry,
} from '../../components';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import {
   getAllNotifications,
   onNotificationPressed,
} from '../../redux/actions/notifications';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
const Notifications = ({ navigation }) => {
   const isFocused = useIsFocused();
   const [refreshing, setRefreshing] = useState(false);
   const dispatch = useDispatch();
   useEffect(() => {
      if (isFocused) {
         dispatch(getAllNotifications());
      } else {
         return;
      }
      return () => {};
   }, [isFocused]);

   const {
      getNotificationLoader,
      notifications,
      getNotificationError,
   } = useSelector(state => ({
      getNotificationLoader: state.Notification.getNotificationLoader,
      notifications: state.Notification.notifications,
      getNotificationError: state.Notification.getNotificationError,
   }));
   console.log(notifications);
   const notificationsList = notifications.sort(
      (a, b) =>
         new Date(moment(b.NotificatonTime, 'YYYY-MM-DD hh:mm:ss')).getTime() -
         new Date(moment(a.NotificatonTime, 'YYYY-MM-DD hh:mm:ss')).getTime()
   );
   const handleRefresh = async () => {
      setRefreshing(true);
      dispatch(getAllNotifications());
      setRefreshing(false);
   };
   const notificationTemplate = ({
      Comments,
      ComplainId,
      ContractorId,
      Covered,
      CreatedOn,
      PlateNumber,
      StatusNameAr,
      StatusNameEn,
      VehicleId,
      VehicleType,
      userId,
      NotificatonType,
      StatusId,
   }) => {
      switch (StatusNameEn?.trim()) {
         case 'New':
            return `  لقد تم انشاء بلاغ رقم ${ComplainId} علي المعده رقم ${VehicleId}`;
            break;

         case 'in progress':
            return `البلاغ رقم ${ComplainId} علي المعده رقم ${VehicleId} جاري تنفيذه`;
            break;

         case 'NotApprove':
            return `البلاغ رقم ${ComplainId} علي المعده رقم ${VehicleId} تم رفضه`;
            break;

         case 'Delayed for inspection':
            return `  لقد أصبح البلاغ رقم ${ComplainId} علي المعده رقم ${VehicleId} متأخر في المعاينه`;
            break;
         case 'Delayed for approval':
            return `  لقد أصبح البلاغ رقم ${ComplainId} علي المعده رقم ${VehicleId} متأخر في الإعتماد`;
            break;
         case 'Delayed for execution':
            return `  لقد أصبح البلاغ رقم ${ComplainId} علي المعده رقم ${VehicleId} متأخر في التنفيذ`;
            break;
         case 'Approval pending':
            return `  لقد أصبح البلاغ رقم ${ComplainId} علي المعده رقم ${VehicleId} قيد التعميد`;
            break;
         case 'Done':
            return `  لقد تم حل مشكله البلاغ رقم ${ComplainId} علي المعده رقم ${VehicleId}`;
            break;
      }
   };
   return (
      <ImageBackground
         source={BackgroundImage}
         style={styles.container}
         resizeMode="stretch">
         <Header>
            <Icon
               name={'arrow-right'}
               type={'simple-line-icon'}
               color={HEADER_ICONS_COLOR}
               onPress={() => navigation.goBack()}
               iconContainerStyle={{ flex: 0.1 }}
               size={responsiveFontSize(3)}
            />

            <View style={{ flex: 1 }}>
               <CustomText
                  text={'التنبيهات'}
                  textStyle={{ alignSelf: 'center' }}
               />
            </View>
         </Header>
         <View style={{ flex: 0.95 }}>
            {getNotificationLoader || getNotificationError ? (
               <LoaderAndRetry
                  loading={getNotificationLoader}
                  error={getNotificationError}
                  loadingText={'جاري تحميل التنبيهات'}
                  errorText={'حدث خطأ برجاء المحاوله مره اخري'}
               />
            ) : (
               <FlatList
                  data={notificationsList}
                  keyExtractor={(iteem, index) => `${index}`}
                  ListEmptyComponent={() => (
                     <View
                        style={{
                           height: SCREEN_HEIGHT * 0.85,
                           justifyContent: 'center',
                           alignItems: 'center',
                        }}>
                        <EmptyList emptyText={'لايوجد أي تنبيهات'} />
                     </View>
                  )}
                  renderItem={({
                     item: {
                        Comments,
                        ComplainId,
                        ContractorId,
                        Covered,
                        CreatedOn,
                        PlateNumber,
                        StatusNameAr,
                        StatusNameEn,
                        VehicleId,
                        VehicleType,
                        userId,
                        NotificatonType,
                        StatusId,
                        NotificatonTime,
                     },
                     index,
                  }) => {
                     return (
                        <NotificationCard
                           notificationTimeText={moment(
                              NotificatonTime,
                              'YYYY-MM-DD hh:mm:ss'
                           ).calendar()}
                           notificationName={NotificatonType}
                           notificationIconSize={responsiveFontSize(3)}
                           containerStyle={{ alignSelf: 'center' }}
                           notificationDetailes={notificationTemplate({
                              Comments,
                              ComplainId,
                              ContractorId,
                              Covered,
                              CreatedOn,
                              PlateNumber,
                              StatusNameAr,
                              StatusNameEn,
                              VehicleId,
                              VehicleType,
                              userId,
                              NotificatonType,
                              StatusId,
                           })}
                           onNotificationCardPressed={() => {
                              dispatch(
                                 onNotificationPressed(
                                    ComplainId,
                                    navigation,
                                    CreatedOn
                                 )
                              );
                           }}
                        />
                     );
                  }}
                  refreshControl={
                     <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[SURFACE_COLOR]}
                     />
                  }
               />
            )}
         </View>
      </ImageBackground>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: SURFACE_COLOR,
      justifyContent: 'space-between',
   },
});

export default Notifications;
