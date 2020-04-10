import React, { useRef, useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   Dimensions,
   KeyboardAvoidingView,
   Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {
   WHITE_COLOR,
   SECONDART_COLOR,
   TEXT_COLOR,
   SCREEN_WIDTH,
} from '../../constants/colors';
import { CustomInput } from '../input';
import { CustomText } from '../customText';
import { CustomButton } from '../Button';
import { SearchDuration } from '../duration';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { CustomDropDown } from '../dropDown';
import KeyboardSpacer from 'react-native-keyboard-spacer';
const SearchModal = ({
   isModalVisible,
   coverScreen,
   backdropColor,
   onBackdropPress,
   onModalShow,
   backdropOpacity,
   searchDropdownLabels,
}) => {
   const menuRef = useRef(null);
   const [dropDownText, setdropDownText] = useState('');
   return (
      <Modal
         testID={'modal'}
         style={styles.container}
         isVisible={isModalVisible}
         onBackdropPress={onBackdropPress}
         onBackButtonPress={onBackdropPress}
         coverScreen
         backdropOpacity={backdropOpacity || 0.6}
         backdropColor={backdropColor || '#000'}>
         <KeyboardAvoidingView
            style={styles.modalContentContainer}
            /*  behavior={Platform.OS == 'ios' ? 'padding' : undefined}
            enabled */
         >
            <CustomText
               text={'بحث'}
               textStyle={{ margin: 20, fontSize: responsiveFontSize(2.5) }}
            />

            <View style={styles.inputsContainer}>
               <CustomInput
                  inputContainerStyle={styles.input}
                  placeholder={'رقم البلاغ'}
               />
               <CustomDropDown
                  onDropDownPressed={() => menuRef.current.show()}
                  menuStyle={styles.menuStyle}
                  onMenuItemPressed={label => {
                     setdropDownText(label);
                     menuRef.current.hide();
                  }}
                  menuContainerStyle={styles.menuContainerStyle}
                  labels={searchDropdownLabels}
                  refrence={menuRef}
                  dropDownText={dropDownText}
               />
               <SearchDuration />
            </View>

            <View style={styles.buttonsContainer}>
               <CustomButton
                  buttonContainerStyle={styles.button}
                  buttonTitle={'بحث'}
               />
               <CustomButton
                  buttonContainerStyle={styles.button}
                  buttonTitle={'إلغاء'}
               />
            </View>
         </KeyboardAvoidingView>
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
      flex: 0.7,
      backgroundColor: SECONDART_COLOR,
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
      alignItems: 'center',
   },
   inputsContainer: {
      width: '90%',
      height: '45%',
      justifyContent: 'space-between',
   },
   buttonsContainer: {
      flexDirection: 'row',
      width: '90%',
      height: '30%',
      alignSelf: 'center',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   button: {
      width: '45%',
      height: '35%',
      borderRadius: 20,
   },
   input: {
      backgroundColor: WHITE_COLOR,
      height: '65%',
   },
   dropDwonButton: {
      width: '100%',
      backgroundColor: 'transparent',
      marginHorizontal: 0,
   },
   menuContainerStyle: {
      width: '100%',
      height: '25%',
      paddingHorizontal: 5,
      backgroundColor: '#fff',
      borderRadius: 50,
      borderColor: TEXT_COLOR,
      borderWidth: 1,
   },
   menuStyle: {
      width: SCREEN_WIDTH - 50,
      alignSelf: 'center',
      overflow: 'scroll',
   },
});

export { SearchModal };
