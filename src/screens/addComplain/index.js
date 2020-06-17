import React, { useRef } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import {
   CustomText,
   Header,
   Icon,
   CustomInput,
   ImageSelector,
   CustomButton,
   CustomDropDown,
   MaterialDropDown,
} from '../../components';
import BackgroundImage from '../../assets/images/bgetention.png';
import {
   SURFACE_COLOR,
   HEADER_ICONS_COLOR,
   SCREEN_HEIGHT,
   WHITE_COLOR,
   SCREEN_WIDTH,
} from '../../constants/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextArea from '../../components/TextArea';
let data = [
   {
      value: 'Banana',
   },
   {
      value: 'Mango',
   },
   {
      value: 'Pear',
   },
];
const AddComplain = ({ navigation }) => {
   const menuRef = useRef(null);
   return (
      <ImageBackground
         source={BackgroundImage}
         style={styles.container}
         resizeMode="stretch">
         <Header>
            <Icon
               name={'ios-arrow-back'}
               type={'ionicon'}
               color={HEADER_ICONS_COLOR}
               iconContainerStyle={{ flex: 0.1, alignItems: 'flex-start' }}
               style={{ transform: [{ rotateY: '-180deg' }] }}
               onPress={() => navigation.goBack()}
            />

            <View style={styles.headerTextContainer}>
               <CustomText text="اضافه بلاغ" />
            </View>
         </Header>
         <KeyboardAwareScrollView
            style={styles.formContainer}
            enableOnAndroid={true}
            contentContainerStyle={styles.keyboardAwareContent}
            extraScrollHeight={30}>
            <View style={styles.inputsWrapper}>
               <CustomInput
                  inputContainerStyle={styles.input}
                  placeholder={'رقم اللوحه'}
               />
               <CustomInput
                  inputContainerStyle={styles.input}
                  placeholder={'رقم المعده'}
               />
               <MaterialDropDown data={data} label={'نوع المعده '} />
               <MaterialDropDown data={data} label={'العقد'} />

               <TextArea
                  containerStyle={styles.textAreaContainer}
                  placeholder="وصف البلاغ"
               />

               <ImageSelector containerStyle={styles.imageSelectorContainer} />

               <CustomButton
                  buttonContainerStyle={styles.buttonContainer}
                  buttonTitle="إضافه"
               />
            </View>
         </KeyboardAwareScrollView>
      </ImageBackground>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: SURFACE_COLOR,
   },
   headerTextContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   formContainer: {
      flex: 1,
   },
   keyboardAwareContent: {
      flexGrow: 1,
      justifyContent: 'center',
   },
   inputsWrapper: {
      flexGrow: 1,
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'space-evenly',
   },
   textAreaContainer: {
      height: SCREEN_HEIGHT / 5,
      width: '100%',
      marginVertical: 10,
   },
   buttonContainer: {
      alignSelf: 'center',
      width: '100%',
      borderRadius: 10,
      height: SCREEN_HEIGHT / 15,
   },
   input: {
      backgroundColor: SURFACE_COLOR,
      borderRadius: 10,
      paddingHorizontal: 5,
      marginVertical: 0,
   },
   imageSelectorContainer: {
      marginVertical: 10,
      width: '100%',
   },
});

export default AddComplain;
