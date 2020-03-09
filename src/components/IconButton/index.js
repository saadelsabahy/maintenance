import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Icon } from '../Icon';
const IconButton = ({
   onIconPressed,
   iconContainerStyle,
   iconName,
   iconStyle,
   iconColor,
   iconSize,
   touchableStyle,
   activeOpacity,
   buttonTextStyle,
   iconButtonText,
   iconType,
   icoBackGround,
}) => {
   return (
      <TouchableOpacity
         onPress={onIconPressed}
         style={[styles.iconContainer, touchableStyle]}
         activeOpacity={activeOpacity || 0.8}>
         <Icon
            name={iconName}
            color={iconColor}
            size={iconSize || 20}
            style={[iconStyle]}
            type={iconType}
            icoBackGround={icoBackGround}
         />
         {iconButtonText && (
            <Text style={[styles.text, buttonTextStyle]}>{iconButtonText}</Text>
         )}
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
   },
   text: {
      fontSize: 15,
      color: '#fff',
      textTransform: 'capitalize',
      letterSpacing: 1,
   },
});
export { IconButton };
