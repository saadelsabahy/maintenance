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
import { Icon } from '../Icon';
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
         <View style={styles.modalContentContainer}>
            <View
               style={{
                  position: 'absolute',
                  start: 5,
                  top: 20,
                  zIndex: 100000,
               }}>
               <Icon
                  name={'close'}
                  type={'material-community'}
                  onPress={onBackdropPress}
                  iconContainerStyle={{ flex: 1 }}
               />
            </View>
            <KeyboardAwareScrollView style={{ flex: 1 }} enableOnAndroid={true}>
               <View
                  style={{
                     width: '100%',
                     height: 40,
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
                     placeholder={'رقم البلاغ'}
                  />
                  <CustomInput
                     inputContainerStyle={styles.input}
                     placeholder={'رقم العقد'}
                  />
                  <CustomInput
                     inputContainerStyle={styles.input}
                     placeholder={'حاله البلاغ'}
                  />

                  <CustomInput
                     inputContainerStyle={styles.input}
                     placeholder={'رقم اللوحه'}
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
      height: SCREEN_HEIGHT * 0.9,
      backgroundColor: SECONDART_COLOR,
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
      alignItems: 'center',
   },
   inputsContainer: {
      height: SCREEN_HEIGHT * 0.7,
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
      height: SCREEN_HEIGHT / 15,
      borderRadius: 20,
   },
   input: {
      backgroundColor: WHITE_COLOR,
   },
   dropDwonButton: {
      width: '100%',
      backgroundColor: 'transparent',
      marginHorizontal: 0,
   },
   menuContainerStyle: {
      width: '100%',
      paddingHorizontal: 5,
      backgroundColor: '#fff',
      borderRadius: 50,
      borderColor: TEXT_COLOR,
      borderWidth: 1,
      height: 50,
   },
   menuStyle: {
      width: SCREEN_WIDTH - 50,
      alignSelf: 'center',
      overflow: 'scroll',
   },
});

export { SearchModal };
