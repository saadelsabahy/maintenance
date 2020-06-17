import React, { useState, useEffect } from 'react';
import {
   View,
   Text,
   ScrollView,
   StyleSheet,
   ActivityIndicator,
   ImageBackground,
} from 'react-native';
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
   HEADER_ICONS_COLOR,
   SURFACE_COLOR,
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
import BackgroundImage from '../../assets/images/app_bg.png';

const WaitApproval = ({ navigation, route }) => {
   const { data, distination } = route.params;
   const [userType, setuserType] = useState(null);
   const [isSignatureModalVisible, setisSignatureModalVisible] = useState(null);
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
   const handleSignatureModal = () => {
      setisSignatureModalVisible(!isSignatureModalVisible);
   };
   const renderButtons = () => {
      switch (distination) {
         case 3:
            return (
               userType == 0 && (
                  <CustomButton
                     buttonContainerStyle={{ ...styles.button, width: '90%' }}
                     buttonTitle={'تم الحل'}
                     onButtonPressed={() =>
                        dispatch(onExcutionDone(data, navigation))
                     }
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
            if (userType != -1 && userType != 0)
               return (
                  <CustomButton
                     buttonContainerStyle={{ ...styles.button, width: '90%' }}
                     buttonTitle={'تعميد'}
                     onButtonPressed={() =>
                        dispatch(onAcceptThePreview(data, navigation))
                     }
                     loading={acceptSpinner}
                  />
               );
            return null;
            break;
         default:
            if (userType != -1 && userType != 0)
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
                        onButtonPressed={() =>
                           dispatch(onAcceptThePreview(data, navigation))
                        }
                        loading={acceptSpinner}
                        spinnerColor={WHITE_COLOR}
                     />
                     <CustomButton
                        buttonContainerStyle={styles.button}
                        buttonTitle={'رفض'}
                        onButtonPressed={() =>
                           dispatch(onRejectThePreview(data, navigation))
                        }
                        loading={rejectSpinner}
                        spinnerColor={WHITE_COLOR}
                     />
                  </View>
               );
            return null;
            break;
      }
   };
   return (
      <ImageBackground
         source={BackgroundImage}
         style={styles.container}
         resizeMode="stretch">
         <Header containerStyle={{ width: '90%' }}>
            <Icon
               name={'ios-arrow-back'}
               type={'ionicon'}
               color={HEADER_ICONS_COLOR}
               iconContainerStyle={{ flex: 1, alignItems: 'flex-start' }}
               style={{ transform: [{ rotateY: '-180deg' }] }}
               onPress={() => navigation.goBack()}
            />

            {/* <View style={styles.headerIconContainer}>
               <Icon
                  name={'list-unordered'}
                  type={'octicon'}
                  color={WHITE_COLOR}
                  iconContainerStyle={{ flex: 1 }}
               />
            </View> */}
         </Header>
         {!userType ? (
            <View
               style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
               }}>
               <ActivityIndicator
                  color={WHITE_COLOR}
                  size={'large'}
                  style={{ alignSelf: 'center' }}
               />
            </View>
         ) : (
            <>
               <View
                  style={{
                     width: '100%',
                     height: '35%',
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
                     onSelectExcutionImages={() =>
                        dispatch(selectExcutionPhotos())
                     }
                     spareParts={data.spareParts ? data.spareParts : []}
                     oncloseBottomSheet={() => dispatch(onCloseExcutionSheet())}
                     userType={userType}
                     vehicleNumber={data.vehicleNumber}
                     contractorNumber={data.contractorNumber}
                     handleSignatureModal={handleSignatureModal}
                     isSignatureModalVisible={isSignatureModalVisible}
                  />
               </View>
               <View style={styles.buttonsContainer}>{renderButtons()}</View>
            </>
         )}
      </ImageBackground>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: SURFACE_COLOR,
   },
   headerIconContainer: {
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
   },
   complainsItemContainer: {
      flex: 1,
      height: '100%',
      borderRadius: 0,
      borderTopStartRadius: 50,
      marginBottom: 0,
      backgroundColor: 'transparent',
   },
   bottomSheetContainer: {
      flex: 1,
   },
   buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
      width: '90%',
      alignSelf: 'center',
      zIndex: 1000,
   },
   button: {
      width: '45%',
      height: SCREEN_HEIGHT / 18,
   },
});

export default WaitApproval;
