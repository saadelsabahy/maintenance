import React, { useRef, useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   Dimensions,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
   Keyboard,
   ImageBackground,
   ImageBackgroundBase,
} from 'react-native';
import Modal from 'react-native-modal';
import {
   WHITE_COLOR,
   SECONDART_COLOR,
   TEXT_COLOR,
   SCREEN_WIDTH,
   SCREEN_HEIGHT,
   SURFACE_COLOR,
} from '../../constants/colors';
import { CustomInput } from '../input';
import { CustomText } from '../customText';
import { CustomButton } from '../Button';
import { SearchDuration } from '../duration';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { CustomDropDown } from '../dropDown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from '../Icon';
import FlashMessage from 'react-native-flash-message';
import BackgroundImage from '../../assets/images/popup.png';
import { MaterialDropDown } from '../customDropDown';
import { EVISION_USER } from '../../utils/complainsStutus';
const DashboardFilter = ({
   isModalVisible,
   coverScreen,
   backdropColor,
   onBackdropPress,
   onModalShow,
   backdropOpacity,
   searchDropdownLabels,
   contructorId,
   onContructorIdCgange,
   onDashboardSearchFilterPressed,
   contractors,
   selectedContractorId,
   userType,
}) => {
   const menuRef = useRef(null);
   const [keyboardShow, setKeyboardShow] = useState(false);
   const filterModalFlashMessage = useRef(null);
   const HideModal = () => {
      Keyboard.dismiss();
      onBackdropPress();
   };
   const handleDashBoardFilter = () => {
      onDashboardSearchFilterPressed();
   };
   console.log(
      'selectedContractorId',
      contractors,
      contractors.find(contractor => contractor.Id == selectedContractorId),
      selectedContractorId
   );
   return (
      <Modal
         testID={'modal'}
         style={styles.container}
         isVisible={isModalVisible}
         onBackButtonPress={onBackdropPress}
         coverScreen
         backdropOpacity={backdropOpacity || 0.6}
         backdropColor={backdropColor || '#000'}
         avoidKeyboard>
         <ImageBackground
            source={BackgroundImage}
            resizeMode="stretch"
            style={styles.modalContentContainer}>
            <KeyboardAwareScrollView
               style={{
                  flex: 1,
               }}
               contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
               }}
               enableOnAndroid={true}
               keyboardShouldPersistTaps="always"
               enableAutomaticScroll={false}>
               <View
                  style={{
                     flex: 1,
                     flexDirection: 'row',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     padding: 15,
                  }}>
                  <View
                     style={{
                        flex: 1,
                        alignItems: 'flex-start',
                     }}>
                     <CustomText
                        text={'بحث'}
                        textStyle={{
                           fontSize: responsiveFontSize(2.7),
                        }}
                     />
                  </View>
                  <Icon
                     name={'close'}
                     type={'material-community'}
                     onPress={HideModal}
                     iconContainerStyle={{
                        position: 'absolute',
                        end: 5,
                        top: -10,
                        padding: 5,

                        justifyContent: 'center',
                     }}
                     color={TEXT_COLOR}
                  />
               </View>
               <View style={styles.inputsContainer}>
                  {/* <CustomInput
                     inputContainerStyle={styles.input}
                     placeholder={'رقم العقد'}
                     value={contructorId}
                     onChangeText={onContructorIdCgange}
                     keyboardType={'numeric'}
                     maxLength={2}
                  /> */}
                  <MaterialDropDown
                     data={contractors}
                     label={'رقم العقد'}
                     value={
                        Boolean(+selectedContractorId) &&
                        userType == EVISION_USER
                           ? contractors.find(
                                contractor =>
                                   contractor.Id == selectedContractorId
                             ).value
                           : ''
                     }
                     onChangeText={(value, index, data) => {
                        onContructorIdCgange(data[index].Id);
                     }}
                     referance={c => (menuRef.current = c)}
                  />
               </View>
               <View style={styles.buttonsContainer}>
                  <CustomButton
                     buttonContainerStyle={styles.button}
                     buttonTitle={'بحث'}
                     onButtonPressed={handleDashBoardFilter}
                  />
                  <CustomButton
                     buttonContainerStyle={styles.button}
                     buttonTitle={'إلغاء'}
                     onButtonPressed={() => {
                        onContructorIdCgange('');

                        onDashboardSearchFilterPressed();
                     }}
                  />
               </View>
            </KeyboardAwareScrollView>
         </ImageBackground>
         <FlashMessage
            ref={filterModalFlashMessage}
            position={'top'}
            textStyle={styles.flashText}
            titleStyle={styles.flashText}
            duration={4000}
            style={{ alignItems: 'flex-start' }}
         />
      </Modal>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: SCREEN_WIDTH,
      marginBottom: 0,
      marginStart: 0,
      justifyContent: 'flex-end',
   },
   modalContentContainer: {
      height: SCREEN_HEIGHT * 0.35,
      alignItems: 'center',
      justifyContent: 'center',
   },
   inputsContainer: {
      width: '90%',
      height: SCREEN_HEIGHT / 10,
      justifyContent: 'center',
   },
   buttonsContainer: {
      flexDirection: 'row',
      width: '90%',
      alignSelf: 'center',
      height: SCREEN_HEIGHT / 7,
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   button: {
      width: '45%',
      height: SCREEN_HEIGHT / 16,
   },
   input: {
      backgroundColor: SURFACE_COLOR,
      paddingHorizontal: 10,
   },
   flashText: {
      fontFamily: 'DroidArabicKufi',
      textTransform: 'capitalize',
      fontSize: responsiveFontSize(1.7),
   },
});

export { DashboardFilter };
