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
} from 'react-native';
import Modal from 'react-native-modal';
import {
   WHITE_COLOR,
   SECONDART_COLOR,
   TEXT_COLOR,
   SCREEN_WIDTH,
   SCREEN_HEIGHT,
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
}) => {
   const menuRef = useRef(null);
   const [keyboardShow, setKeyboardShow] = useState(false);
   const filterModalFlashMessage = useRef(null);
   const HideModal = () => {
      Keyboard.dismiss();
      onBackdropPress();
   };
   const handleDashBoardFilter = () => {
      if (!contructorId) {
         filterModalFlashMessage.current.showMessage({
            type: 'danger',
            message: 'يجب ادخال رقم العقد',
         });
      } else if (+contructorId < 80 || +contructorId > 84) {
         filterModalFlashMessage.current.showMessage({
            type: 'danger',
            message: 'برجاء ادخال رقم عقد صحيح',
         });
      } else {
         onDashboardSearchFilterPressed();
      }
   };
   return (
      <Modal
         testID={'modal'}
         style={styles.container}
         isVisible={isModalVisible}
         onBackdropPress={onBackdropPress}
         onBackButtonPress={onBackdropPress}
         coverScreen
         backdropOpacity={backdropOpacity || 0.6}
         backdropColor={backdropColor || '#000'}
         avoidKeyboard>
         <View style={styles.modalContentContainer}>
            <KeyboardAwareScrollView
               style={{
                  flex: 1,
               }}
               contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'center',
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
                     padding: 10,
                  }}>
                  <Icon
                     name={'close'}
                     type={'material-community'}
                     onPress={HideModal}
                     iconContainerStyle={{
                        flex: 1,
                        alignItems: 'flex-start',
                     }}
                     color={TEXT_COLOR}
                  />
                  <View
                     style={{
                        flex: 1,
                        alignItems: 'center',
                     }}>
                     <CustomText
                        text={'بحث'}
                        textStyle={{
                           fontSize: responsiveFontSize(2.7),
                        }}
                     />
                  </View>
                  <View style={{ flex: 1 }} />
               </View>
               <View style={styles.inputsContainer}>
                  <CustomInput
                     inputContainerStyle={styles.input}
                     placeholder={'رقم العقد'}
                     value={contructorId}
                     onChangeText={onContructorIdCgange}
                     keyboardType={'numeric'}
                     maxLength={2}
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
                     onButtonPressed={onBackdropPress}
                  />
               </View>
            </KeyboardAwareScrollView>
         </View>
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
      backgroundColor: SECONDART_COLOR,
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
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
      height: SCREEN_HEIGHT / 15,
      borderRadius: 20,
   },
   input: {
      backgroundColor: WHITE_COLOR,
      paddingHorizontal: 10,
   },
   flashText: {
      fontFamily: 'DroidArabicKufi',
      textTransform: 'capitalize',
      fontSize: responsiveFontSize(1.7),
   },
});

export { DashboardFilter };
