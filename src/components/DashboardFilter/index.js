import React, { useRef, useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   Dimensions,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
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
const DashboardFilter = ({
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
         <View style={styles.modalContentContainer}>
            <KeyboardAwareScrollView
               style={{
                  flex: 1,
               }}
               contentContainerStyle={{
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
               }}
               enableOnAndroid={true}>
               <View
                  style={{
                     width: '100%',
                     height: SCREEN_HEIGHT / 15,
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}>
                  <CustomText
                     text={'بحث'}
                     textStyle={{
                        margin: 20,
                        fontSize: responsiveFontSize(2.5),
                     }}
                  />
               </View>

               <View style={styles.inputsContainer}>
                  <CustomInput
                     inputContainerStyle={styles.input}
                     placeholder={'رقم العقد'}
                  />

                  <View
                     style={{
                        height: '20%',
                        justifyContent: 'center',
                        width: '100%',
                        alignItems: 'center',
                     }}>
                     <SearchDuration />
                  </View>
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
            </KeyboardAwareScrollView>
         </View>
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
      height: SCREEN_HEIGHT / 4,
      justifyContent: 'space-evenly',
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
   },
});

export { DashboardFilter };
