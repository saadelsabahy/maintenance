import React from 'react';
import { View, Text, StyleSheet, I18nManager, TextInput } from 'react-native';
import Textarea from 'react-native-textarea';
import { INPUT_COLOR, TEXT_COLOR } from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
const TextArea = ({ placeholder, ...res }) => {
   return (
      <View style={styles.textareaContainer}>
         <TextInput
            style={styles.textarea}
            maxLength={120}
            placeholder={placeholder}
            placeholderTextColor={TEXT_COLOR}
            underlineColorAndroid={'transparent'}
            {...res}
         />
      </View>
   );
};
const styles = StyleSheet.create({
   textareaContainer: {
      width: '90%',
      height: '30%',
      backgroundColor: INPUT_COLOR,
      alignSelf: 'center',
      alignItems: 'flex-start',
      borderWidth: 0.4,
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
   },
});

export default TextArea;
