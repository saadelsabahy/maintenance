import React, { useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   ImageBackground,
   FlatList,
   RefreshControl,
} from 'react-native';
import BackgroundImage from '../../assets/images/app_bg.png';
import {
   SURFACE_COLOR,
   HEADER_ICONS_COLOR,
   WHITE_COLOR,
} from '../../constants/colors';
import { Header, Icon, CustomText, NotificationCard } from '../../components';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const Notifications = ({ navigation }) => {
   const [refreshing, setRefreshing] = useState(false);
   const handleRefresh = async () => {
      setRefreshing(true);
      // dispatch(getAllNotifications());
      setRefreshing(false);
   };
   return (
      <ImageBackground
         source={BackgroundImage}
         style={styles.container}
         resizeMode="stretch">
         <Header>
            <Icon
               name={'ios-arrow-back'}
               type={'ionicon'}
               color={HEADER_ICONS_COLOR}
               style={{ transform: [{ rotateY: '-180deg' }] }}
               onPress={() => navigation.goBack()}
               iconContainerStyle={{ flex: 0.1 }}
               size={responsiveFontSize(4)}
            />

            <View style={{ flex: 1 }}>
               <CustomText
                  text={'الاشعارات'}
                  textStyle={{ alignSelf: 'center' }}
               />
            </View>
         </Header>
         <View style={{ flex: 0.95 }}>
            <FlatList
               data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
               keyExtractor={(iteem, index) => `${index}`}
               ListEmptyComponent={() => <EmptyList />}
               renderItem={() => {
                  /*  const parsedData = JSON.parse(
                     typeof Data !== 'undefined' && Data
                  );
                  console.log(JSON.parse(Data)); */

                  return (
                     <NotificationCard
                        notificationTimeText={new Date().toLocaleDateString()}
                        notificationIconSize={responsiveFontSize(3)}
                        containerStyle={{ alignSelf: 'center' }}
                        notificationDetailes={`detailes.....`}
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
