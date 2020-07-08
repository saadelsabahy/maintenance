import React from 'react';
import {
   View,
   Text,
   StyleSheet,
   I18nManager,
   TextInput,
   Platform,
} from 'react-native';
import Textarea from 'react-native-textarea';
import {
   INPUT_COLOR,
   TEXT_COLOR,
   SURFACE_COLOR,
   MAIN_RED_COLOR,
   PLACEHOLDER_COLOR,
   ERROR_RED_COLOR,
} from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { CustomText } from '../customText';
const TextArea = ({
   placeholder,
   containerStyle,
   error,
   errorTextStyle,
   name,
   textareaStyle,
   ...res
}) => {
   return (
      <>
         <View style={[styles.textareaContainer, containerStyle]}>
            <TextInput
               name={name}
               style={[
                  Platform.OS == 'ios' && res.value
                     ? { ...styles.textarea, fontFamily: null }
                     : styles.textarea,
                  textareaStyle,
               ]}
               maxLength={120}
               placeholder={placeholder}
               placeholderTextColor={PLACEHOLDER_COLOR}
               selectionColor={MAIN_RED_COLOR}
               underlineColorAndroid={'transparent'}
               {...res}
            />
         </View>
         {error && error.message && (
            <CustomText
               text={error.message}
               textStyle={[styles.errorText, errorTextStyle]}
            />
         )}
      </>
   );
};
const styles = StyleSheet.create({
   textareaContainer: {
      width: '90%',
      height: '100%',
      backgroundColor: SURFACE_COLOR,
      alignSelf: 'center',
      alignItems: 'flex-start',
      borderWidth: 0.3,
      borderRadius: 10,
      borderColor: TEXT_COLOR,
   },
   textarea: {
      textAlignVertical: 'top',
      width: '100%',
      height: '100%',
      fontSize: responsiveFontSize(2),
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      borderRadius: 3,
      color: TEXT_COLOR,
      fontFamily: 'DroidArabicKufi',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      paddingHorizontal: 10,
   },
   errorText: {
      color: ERROR_RED_COLOR,
   },
});

export default TextArea;
