import React from 'react';
import { View, Text, TextInput, StyleSheet, I18nManager } from 'react-native';
import {
   INPUT_COLOR,
   ERROR_RED_COLOR,
   TEXT_COLOR,
} from '../../constants/colors';
import { Icon } from '../Icon';
import { CustomText } from '../customText';

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
}) => {
   return (
      <View style={{ marginVertical: 10 }}>
         <View style={[styles.container, inputContainerStyle]}>
            {iconStartName && (
               <Icon
                  name={iconStartName}
                  style={[styles.StartIcon, iconStartStyle]}
                  size={iconStartSize || 17}
                  color={startIconColor}
                  type={iconType}
               />
            )}
            <TextInput
               placeholder={placeholder}
               style={[styles.input, inputStyle]}
               {...inputProps}
            />
            {iconEndName && (
               <Icon
                  name={iconEndName}
                  style={[styles.EndIcon, iconEndStyle]}
                  size={iconEndSize || 17}
                  type={iconType}
                  color={EndIconColor}
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
      height: 50,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: INPUT_COLOR,
      borderWidth: 0.9,
      borderRadius: 25,
      borderColor: TEXT_COLOR,
      overflow: 'hidden',
   },
   input: {
      flex: 1,
      fontSize: 18,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      borderRadius: 3,
      color: TEXT_COLOR,
      fontFamily: 'DroidArabicKufi',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
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
