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
   console.log(iconStartName, iconType);

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
                  iconBackGround={iconStartBackGround}
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
                  iconBackGround={iconEndBackGround}
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
      fontSize: 18,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      borderRadius: 3,
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
