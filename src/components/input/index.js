import React from 'react';
import { View, Text, TextInput, StyleSheet, I18nManager } from 'react-native';
import { INPUT_COLOR, ERROR_RED_COLOR } from '../../constants/colors';
import { Icon } from '../Icon';
import { CustomText } from '../customText';

const CustomInput = ({
   placeholder,
   inputContainerStyle,
   inputStyle,
   iconStartName,
   IconEndName,
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
            {IconEndName && (
               <Icon
                  name={IconEndName}
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
      width: '90%',
      height: 60,
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   input: {
      flex: 1,
      backgroundColor: INPUT_COLOR,
      borderRadius: 5,
      fontSize: 18,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
   },
   StartIcon: {
      marginHorizontal: 5,
   },
   EndIcon: {
      marginHorizontal: 5,
   },
   errorText: {
      color: ERROR_RED_COLOR,
      fontSize: 17,
   },
});

export { CustomInput };
