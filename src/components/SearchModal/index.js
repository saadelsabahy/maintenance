import React, { useRef, useState, useEffect } from 'react';
import {
   View,
   Text,
   StyleSheet,
   Dimensions,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
   ImageBackground,
   Keyboard,
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
import { useDispatch, useSelector } from 'react-redux';
import { onSearchInputsChange } from '../../redux/actions';
import FlashMessage from 'react-native-flash-message';
import BackgroundImage from '../../assets/images/popup.png';
const SearchModal = ({
   isModalVisible,
   coverScreen,
   backdropColor,
   onBackdropPress,
   onModalShow,
   backdropOpacity,
   searchDropdownLabels,
   onSearchPressed,
   complainNumber,
   complainStatus,
   contructorId,
   plateNumber,
   source,
   dropDownText,
   onSearchDropdownPressed,
}) => {
   const dispatch = useDispatch();
   const menuRef = useRef(null);
   const modalFlashMessage = useRef(null);

   const [keyboardShow, setKeyboardShow] = useState(false);
   useEffect(() => {
      return () => {
         onKeyboardWillHide();
      };
   }, []);
   const onKeyboardWillShow = () => {
      setKeyboardShow(true);
   };
   const onKeyboardWillHide = () => {
      setKeyboardShow(false);
   };
   const HideModal = () => {
      onKeyboardWillHide();
      onBackdropPress();
      Keyboard.dismiss();
   };

   return (
      <Modal
         testID={'modal'}
         style={styles.container}
         isVisible={isModalVisible}
         onBackButtonPress={HideModal}
         coverScreen
         backdropOpacity={backdropOpacity || 0.6}
         backdropColor={backdropColor || '#000'}>
         <ImageBackground
            source={BackgroundImage}
            resizeMode="cover"
            style={
               keyboardShow
                  ? {
                       ...styles.modalContentContainer,
                       height: SCREEN_HEIGHT * 0.5,
                    }
                  : styles.modalContentContainer
            }>
            <KeyboardAwareScrollView
               style={{ flex: 1 }}
               enableOnAndroid={true}
               keyboardShouldPersistTaps="always"
               onKeyboardDidShow={() =>
                  Platform.OS === 'ios' ? null : onKeyboardWillShow()
               }
               onKeyboardDidHide={() =>
                  Platform.OS === 'ios' ? null : onKeyboardWillHide()
               }>
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
                        flex: 1,
                        alignItems: 'flex-end',
                     }}
                     color={TEXT_COLOR}
                  />
               </View>

               <View style={styles.inputsContainer}>
                  <CustomInput
                     inputContainerStyle={styles.input}
                     placeholder={'رقم البلاغ'}
                     keyboardType={'numeric'}
                     onChangeText={text =>
                        dispatch(onSearchInputsChange('complainNumber', text))
                     }
                     value={complainNumber}
                  />
                  <CustomInput
                     inputContainerStyle={styles.input}
                     placeholder={'رقم العقد'}
                     keyboardType={'numeric'}
                     onChangeText={text =>
                        dispatch(onSearchInputsChange('contructorId', text))
                     }
                     value={contructorId}
                  />
                  {/*  <CustomInput
                     inputContainerStyle={styles.input}
                     placeholder={'حاله البلاغ'}
                     onChangeText={text =>
                        dispatch(onSearchInputsChange('complainStatus', text))
                     }
                     value={complainStatus}
                  /> */}

                  <CustomInput
                     inputContainerStyle={styles.input}
                     placeholder={'رقم اللوحه'}
                     onChangeText={text =>
                        dispatch(onSearchInputsChange('plateNumber', text))
                     }
                     value={plateNumber}
                  />
                  {source == 0 && (
                     <CustomDropDown
                        onDropDownPressed={() => menuRef.current.show()}
                        menuStyle={styles.menuStyle}
                        onMenuItemPressed={label =>
                           onSearchDropdownPressed(label, menuRef.current)
                        }
                        menuContainerStyle={styles.menuContainerStyle}
                        labels={searchDropdownLabels}
                        refrence={menuRef}
                        dropDownText={dropDownText}
                     />
                  )}
                  <View
                     style={{
                        height: '20%',
                        justifyContent: 'center',
                        width: '100%',
                        alignItems: 'center',
                     }}>
                     <SearchDuration modalMessage={modalFlashMessage} />
                  </View>
               </View>

               <View style={styles.buttonsContainer}>
                  <CustomButton
                     buttonContainerStyle={styles.button}
                     buttonTitle={'بحث'}
                     onButtonPressed={onSearchPressed}
                  />
                  <CustomButton
                     buttonContainerStyle={styles.button}
                     buttonTitle={'إلغاء'}
                     onButtonPressed={HideModal}
                  />
               </View>
            </KeyboardAwareScrollView>
            <FlashMessage
               ref={modalFlashMessage}
               position={'bottom'}
               textStyle={styles.flashText}
               titleStyle={styles.flashText}
               duration={4000}
            />
         </ImageBackground>
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
      height: SCREEN_HEIGHT * 0.9,
      /*    backgroundColor: SECONDART_COLOR,
      borderTopStartRadius: 20,
      borderTopEndRadius: 20, */
      alignItems: 'center',
   },
   inputsContainer: {
      height: SCREEN_HEIGHT * 0.65,
      width: '95%',
      alignSelf: 'center',
      justifyContent: 'space-evenly',
      alignItems: 'center',
   },
   buttonsContainer: {
      flexDirection: 'row',
      width: '90%',
      height: SCREEN_HEIGHT / 10,
      alignSelf: 'center',
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
   dropDwonButton: {
      width: '100%',
      backgroundColor: 'transparent',
      marginHorizontal: 0,
   },
   menuContainerStyle: {
      width: '100%',
      backgroundColor: SURFACE_COLOR,
      borderRadius: 15,
      borderColor: WHITE_COLOR,
      borderWidth: 0.7,
      height: SCREEN_HEIGHT / 16,
   },
   menuStyle: {
      width: SCREEN_WIDTH - 50,
      alignSelf: 'center',
      overflow: 'scroll',
   },
   flashText: {
      fontFamily: 'DroidArabicKufi',
      textTransform: 'capitalize',
      fontSize: responsiveFontSize(1.7),
      alignSelf: 'center',
   },
});

export { SearchModal };
