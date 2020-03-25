import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { MAIN_COLOR, WHITE_COLOR } from '../../constants/colors';
import { CustomText } from '../customText';

const CustomButton = ({
   buttonTitle,
   buttonTitleStyle,
   loading,
   spinnerColor,
   spinnerSize,
   onButtonPressed,
   buttonContainerStyle,
   buttonActiveOpacity,
}) => {
   return (
      <TouchableOpacity
         style={[styles.container, buttonContainerStyle]}
         onPress={onButtonPressed}
         activeOpacity={buttonActiveOpacity || 0.8}>
         {loading ? (
            <ActivityIndicator
               size={spinnerSize || 'small'}
               animating
               color={spinnerColor}
            />
         ) : (
            <CustomText
               textStyle={[styles.text, buttonTitleStyle]}
               text={buttonTitle}
            />
         )}
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   container: {
      width: '85%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: MAIN_COLOR,
      borderRadius: 7,
      marginVertical: 10,
   },
   text: {
      color: WHITE_COLOR,
      textTransform: 'capitalize',
      fontSize: 20,
      letterSpacing: 0.8,
   },
});

export { CustomButton };
