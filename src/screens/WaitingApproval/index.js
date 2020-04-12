import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
   ImageCarousel,
   Header,
   Icon,
   ComplainsItem,
   CustomBottomSheet,
   CustomButton,
} from '../../components';
import {
   WHITE_COLOR,
   MAIN_COLOR,
   SECONDART_COLOR,
   DASHBOARD_ITEM_ICON_CONTAINER,
   SCREEN_HEIGHT,
   SCREEN_WIDTH,
} from '../../constants/colors';
const WaitApproval = ({ navigation, route }) => {
   const { data, distination } = route.params;

   const renderButtons = () => {
      switch (distination) {
         case 'waitExcution':
            return (
               <CustomButton
                  buttonContainerStyle={{ ...styles.button, width: '90%' }}
                  buttonTitle={'تم الحل'}
               />
            );
            break;
         case 'finished':
            return null;
            break;
         case 'rejected':
            return (
               <CustomButton
                  buttonContainerStyle={{ ...styles.button, width: '90%' }}
                  buttonTitle={'تعميد'}
               />
            );
            break;
         default:
            return (
               <View
                  style={{
                     ...styles.buttonsContainer,
                     flexDirection: 'row',
                     justifyContent: 'space-between',
                  }}>
                  <CustomButton
                     buttonContainerStyle={styles.button}
                     buttonTitle={'تعميد'}
                  />
                  <CustomButton
                     buttonContainerStyle={styles.button}
                     buttonTitle={'رفض'}
                  />
               </View>
            );
            break;
      }
   };
   return (
      <View style={styles.container}>
         <Header>
            <View style={styles.headerIconContainer}>
               <Icon
                  name={'ios-arrow-back'}
                  type={'ionicon'}
                  color={WHITE_COLOR}
                  iconContainerStyle={{ flex: 1 }}
                  style={{ transform: [{ rotateY: '-180deg' }] }}
                  onPress={() => navigation.goBack()}
               />
            </View>
            <View style={styles.headerIconContainer}>
               <Icon
                  name={'list-unordered'}
                  type={'octicon'}
                  color={WHITE_COLOR}
                  iconContainerStyle={{ flex: 1 }}
               />
            </View>
         </Header>
         <View
            style={{
               width: '100%',
               height: '40%',
               backgroundColor: MAIN_COLOR,
            }}>
            <ImageCarousel />
         </View>
         <View style={styles.detailesContainer}>
            <ComplainsItem
               containerStyle={styles.complainsItemContainer}
               {...data}
               onComplainPressed={() => {}}
            />
         </View>
         <View style={styles.bottomSheetContainer}>
            <CustomBottomSheet />
         </View>
         <View style={styles.buttonsContainer}>{renderButtons()}</View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: MAIN_COLOR,
   },
   headerIconContainer: {
      width: Math.round(SCREEN_HEIGHT / 2 + SCREEN_WIDTH / 2) / 12,
      height: Math.round(SCREEN_HEIGHT / 2 + SCREEN_WIDTH / 2) / 12,
      borderRadius: Math.round(SCREEN_HEIGHT / 2 + SCREEN_WIDTH / 2),
      backgroundColor: DASHBOARD_ITEM_ICON_CONTAINER,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 2,
      shadowOffset: { width: 0, height: 5 },
      shadowColor: '#000',
      shadowOpacity: 0.7,
      elevation: 10,
   },
   detailesContainer: {
      flex: 1,
      paddingHorizontal: 10,
      backgroundColor: WHITE_COLOR,
      borderTopStartRadius: 50,
   },
   complainsItemContainer: {
      flex: 1,
      height: '100%',
      borderRadius: 0,
      borderTopStartRadius: 50,
      marginBottom: 0,
   },
   bottomSheetContainer: {
      flex: 1,
      backgroundColor: WHITE_COLOR,
   },
   buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
      width: '90%',
      alignSelf: 'center',
   },
   button: {
      width: '45%',
      height: SCREEN_HEIGHT / 18,
   },
});

export default WaitApproval;
