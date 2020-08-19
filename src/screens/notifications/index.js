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
} from '../../constants/colors';
import {
   Header,
   Icon,
   CustomText,
   NotificationCard,
   EmptyList,
} from '../../components';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import {
   getAllNotifications,
   onNotificationPressed,
} from '../../redux/actions/notifications';
import { useIsFocused } from '@react-navigation/native';
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
   const notificationsList = notifications.sort(
      (a, b) =>
         new Date(b.CreatedOn).getTime() - new Date(a.CreatedOn).getTime()
   );
   console.log(notifications);
   const handleRefresh = async () => {
      setRefreshing(true);
      dispatch(getAllNotifications());
      setRefreshing(false);
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
                  text={'الاشعارات'}
                  textStyle={{ alignSelf: 'center' }}
               />
            </View>
         </Header>
         <View style={{ flex: 0.95 }}>
            {getNotificationLoader ? (
               <ActivityIndicator
                  size={'large'}
                  animating
                  color={WHITE_COLOR}
                  style={{ flex: 1 }}
               />
            ) : (
               <FlatList
                  data={notificationsList}
                  keyExtractor={(iteem, index) => `${index}`}
                  ListEmptyComponent={() => (
                     <View
                        style={{
                           flex: 1,
                           justifyContent: 'center',
                           alignItems: 'center',
                        }}>
                        <EmptyList />
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
                     },
                     index,
                  }) => {
                     return (
                        <NotificationCard
                           notificationTimeText={`${new Date(
                              CreatedOn
                           ).toLocaleDateString('ar-EG')} ${new Date(
                              CreatedOn
                           ).toLocaleTimeString('ar-EG')}`}
                           notificationName={NotificatonType}
                           notificationIconSize={responsiveFontSize(3)}
                           containerStyle={{ alignSelf: 'center' }}
                           notificationDetailes={`detailes.....`}
                           onNotificationCardPressed={() => {
                              dispatch(
                                 onNotificationPressed(ComplainId, navigation, {
                                    params: { distination: StatusId },
                                 })
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
