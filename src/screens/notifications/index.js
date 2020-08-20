import React, {useState, useEffect} from 'react';
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
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllNotifications,
  onNotificationPressed,
} from '../../redux/actions/notifications';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
const Notifications = ({navigation}) => {
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
    (a, b) => new Date(b.CreatedOn).getTime() - new Date(a.CreatedOn).getTime(),
  );
  console.log(notifications);
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
    switch (StatusNameEn.trim()) {
      case 'New':
        return `  لقد تم انشاء بلاغ رقم ${ComplainId} علي المعده رقم ${VehicleId}`;
        break;

      case 'InProgress':
        return `البلاغ رقم ${ComplainId} علي المعده رقم ${VehicleId} جاري تنفيذه`;
        break;

      case 'Resolved':
        return `البلاغ رقم ${ComplainId} علي المعده رقم ${VehicleId} تم حل مشكلته`;
        break;

      case 'Closed':
        return `  لقد تم اغلاق البلاغ رقم ${ComplainId} علي المعده رقم ${VehicleId}`;
        break;

      case 'Delayed':
        return `  البلاغ رقم ${ComplainId} علي المعده رقم ${VehicleId} أصبح متأخر`;
        break;

      case 'Delayed And Closed':
        return `  لقد تم انشاء بلاغ رقم ${ComplainId} علي المعده رقم ${VehicleId}`;
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
          iconContainerStyle={{flex: 0.1}}
          size={responsiveFontSize(3)}
        />

        <View style={{flex: 1}}>
          <CustomText text={'الاشعارات'} textStyle={{alignSelf: 'center'}} />
        </View>
      </Header>
      <View style={{flex: 0.95}}>
        {getNotificationLoader ? (
          <ActivityIndicator
            size={'large'}
            animating
            color={WHITE_COLOR}
            style={{flex: 1}}
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
              console.log(StatusId);
              return (
                <NotificationCard
                  notificationTimeText={moment(
                    CreatedOn,
                    'YYYY-MM-DD hh:mm:ss',
                  ).calendar()}
                  notificationName={NotificatonType}
                  notificationIconSize={responsiveFontSize(3)}
                  containerStyle={{alignSelf: 'center'}}
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
                      onNotificationPressed(ComplainId, navigation, CreatedOn),
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
