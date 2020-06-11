import React from 'react';
import { View, Text, StyleSheet, I18nManager, Platform } from 'react-native';
import {
   INPUT_COLOR,
   ERROR_RED_COLOR,
   TEXT_COLOR,
   SCREEN_HEIGHT,
   SCREEN_WIDTH,
   MAIN_COLOR,
   PLACEHOLDER_COLOR,
} from '../../constants/colors';
import { Icon } from '../Icon';
import { CustomText } from '../customText';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const CustomInput = ({
   placeholder,
   inputContainerStyle,
   inputStyle,
   iconStartName,
   iconEndName,
   iconStartStyle,
   iconEndStyle,
   iconStartSize,
   iconEndSize,
   inputProps,
   error,
   errorText,
   errorTextStyle,
   iconType,
   EndIconColor,
   startIconColor,
   iconStartBackGround,
   iconEndBackGround,
   inputWrapper,
   referance,
   ...res
}) => {
   return (
      <View
         style={[
            {
               height: SCREEN_HEIGHT / 14,
               alignItems: 'center',
               justifyContent: 'center',
               width: '100%',
               marginVertical: 10,
            },
            inputWrapper,
         ]}>
         <View style={[styles.container, inputContainerStyle]}>
            {iconStartName && (
               <Icon
                  name={iconStartName}
                  style={[styles.StartIcon, iconStartStyle]}
                  size={iconStartSize}
                  color={startIconColor}
                  type={iconType}
                  iconContainerStyle={{ flex: 0.2 }}
               />
            )}
            <TextInput
               placeholder={placeholder}
               selectionColor={MAIN_COLOR}
               style={[
                  Platform.OS == 'ios' && res.value
                     ? { ...styles.input, fontFamily: null }
                     : styles.input,
                  inputStyle,
               ]}
               underlineColorAndroid="transparent"
               placeholderStyle={{ fontFamily: 'DroidArabicKufi' }}
               ref={referance}
               autoCapitalize="none"
               {...res}
            />
            {iconEndName && (
               <Icon
                  name={iconEndName}
                  style={[styles.EndIcon, iconEndStyle]}
                  size={iconEndSize}
                  type={iconType}
                  color={EndIconColor}
                  iconContainerStyle={{ flex: 0.2 }}
               />
            )}
         </View>
         {error && (
            <CustomText
               text={errorText}
               textStyle={[styles.errorText, errorTextStyle]}
            />
         )}
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      borderBottomWidth: 0.9,
      borderColor: PLACEHOLDER_COLOR,
   },
   input: {
      flex: 1,
      height: '100%',
      fontSize: responsiveFontSize(2),
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      color: TEXT_COLOR,
      fontFamily: 'DroidArabicKufi',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingVertical: 5,
      writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
   },
   StartIcon: {
      marginHorizontal: 10,
   },
   EndIcon: {
      marginHorizontal: 10,
   },
   errorText: {
      color: ERROR_RED_COLOR,
      fontSize: 17,
   },
});

export { CustomInput };
