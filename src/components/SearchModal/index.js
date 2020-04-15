import React, { useRef, useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { onSearchInputsChange } from '../../redux/actions';
const SearchModal = ({
   isModalVisible,
   coverScreen,
   backdropColor,
   onBackdropPress,
   onModalShow,
   backdropOpacity,
   searchDropdownLabels,
   onSearchPressed
}) => {
   const dispatch = useDispatch();
   const menuRef = useRef(null);
   const [dropDownText, setdropDownText] = useState('');
   const [keyboardShow, setKeyboardShow] = useState(false);
   useEffect(() => {

      return () => {
         onKeyboardWillHide()
      }
   }, [])
   const onKeyboardWillShow = () => {

      setKeyboardShow(true)
   }
   const onKeyboardWillHide = () => {
      setKeyboardShow(false)
   }
   const HideModal = () => {
      onKeyboardWillHide()
      onBackdropPress()
   }
   return (
      <Modal
         testID={'modal'}
         style={styles.container}
         isVisible={isModalVisible}
         onBackdropPress={HideModal}
         coverScreen
         backdropOpacity={backdropOpacity || 0.6}
         backdropColor={backdropColor || '#000'}>
         <View style={keyboardShow ? { ...styles.modalContentContainer, height: SCREEN_HEIGHT * .5 } : styles.modalContentContainer} >
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
                  onPress={HideModal}
                  iconContainerStyle={{ flex: 1 }}
               />
            </View>
            <KeyboardAwareScrollView style={{ flex: 1 }} enableOnAndroid={true} onKeyboardDidShow={() => onKeyboardWillShow()}
               onKeyboardDidHide={() => onKeyboardWillHide()}>
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
                     keyboardType={'numeric'}
                     onChangeText={(text) => dispatch(onSearchInputsChange('complainNumber', text))}
                  />
                  <CustomInput
                     inputContainerStyle={styles.input}
                     placeholder={'رقم العقد'}
                     keyboardType={'numeric'}
                     onChangeText={(text) => dispatch(onSearchInputsChange('contructorId', text))}
                  />
                  <CustomInput
                     inputContainerStyle={styles.input}
                     placeholder={'حاله البلاغ'}
                     onChangeText={(text) => dispatch(onSearchInputsChange('complainStatus', text))}
                  />

                  <CustomInput
                     inputContainerStyle={styles.input}
                     placeholder={'رقم اللوحه'}
                     onChangeText={(text) => dispatch(onSearchInputsChange('plateNumber', text))}
                  />
                  <CustomDropDown
                     onDropDownPressed={() => menuRef.current.show()}
                     menuStyle={styles.menuStyle}
                     onMenuItemPressed={label => {
                        dispatch(onSearchInputsChange('complainType', label.id))
                        setdropDownText(label.text)
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
                     onButtonPressed={onSearchPressed}
                  />
                  <CustomButton
                     buttonContainerStyle={styles.button}
                     buttonTitle={'إلغاء'}
                     onButtonPressed={HideModal}
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
