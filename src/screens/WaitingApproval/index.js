import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import {
   onExcutionDone,
   onAcceptThePreview,
   onRejectThePreview,
   selectExcutionPhotos,
   onCloseExcutionSheet,
} from '../../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
const WaitApproval = ({ navigation, route }) => {
   const { data, distination } = route.params;
   const [userType, setuserType] = useState(null);
   const dispatch = useDispatch();
   const {
      images,
      acceptSpinner,
      rejectSpinner,
      excutionSpinner,
   } = useSelector(state => ({
      images: state.UpdateComplainsStatus.images,
      acceptSpinner: state.UpdateComplainsStatus.acceptSpinner,
      rejectSpinner: state.UpdateComplainsStatus.rejectSpinner,
      excutionSpinner: state.UpdateComplainsStatus.excutionSpinner,
   }));
   useEffect(() => {
      getUserType();
      return () => {};
   }, []);
   const getUserType = async () => {
      const userType = await AsyncStorage.getItem('userType');
      setuserType(userType);
   };
   const renderButtons = () => {
      switch (distination) {
         case 3:
            return (
               userType != -1 && (
                  <CustomButton
                     buttonContainerStyle={{ ...styles.button, width: '90%' }}
                     buttonTitle={'تم الحل'}
                     onButtonPressed={() => dispatch(onExcutionDone(data))}
                     loading={excutionSpinner}
                     spinnerColor={WHITE_COLOR}
                  />
               )
            );
            break;
         case 4:
            return null;
            break;
         case 5:
            userType != -1 && userType != 0 && (
               <CustomButton
                  buttonContainerStyle={{ ...styles.button, width: '90%' }}
                  buttonTitle={'تعميد'}
                  onButtonPressed={() => dispatch(onAcceptThePreview(data))}
                  loading={acceptSpinner}
               />
            );
            break;
         default:
            userType != -1 && userType != 0 && (
               <View
                  style={{
                     ...styles.buttonsContainer,
                     flexDirection: 'row',
                     justifyContent: 'space-between',
                  }}>
                  <CustomButton
                     buttonContainerStyle={styles.button}
                     buttonTitle={'تعميد'}
                     onButtonPressed={() => dispatch(onAcceptThePreview(data))}
                     loading={acceptSpinner}
                     spinnerColor={WHITE_COLOR}
                  />
                  <CustomButton
                     buttonContainerStyle={styles.button}
                     buttonTitle={'رفض'}
                     onButtonPressed={() => dispatch(onRejectThePreview(data))}
                     loading={rejectSpinner}
                     spinnerColor={WHITE_COLOR}
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
               height: '35%',
               backgroundColor: MAIN_COLOR,
            }}>
            <ImageCarousel data={data.images ? data.images : []} />
         </View>
         <View style={styles.detailesContainer}>
            <ComplainsItem
               containerStyle={styles.complainsItemContainer}
               {...data}
               onComplainPressed={() => {}}
            />
         </View>
         <View style={styles.bottomSheetContainer}>
            <CustomBottomSheet
               source={distination}
               excutionImages={images}
               onSelectExcutionImages={() => dispatch(selectExcutionPhotos())}
               spareParts={data.spareParts ? data.spareParts : []}
               oncloseBottomSheet={() => dispatch(onCloseExcutionSheet())}
            />
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
      shadowOffset: { width: 0, height: 2 },
      shadowColor: '#000',
      shadowOpacity: 0.1,
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
