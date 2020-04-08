import React from 'react';
import {
   View,
   Text,
   TouchableOpacity,
   StyleSheet,
   ActivityIndicator,
} from 'react-native';
import { MAIN_COLOR, WHITE_COLOR } from '../../constants/colors';
import { CustomText } from '../customText';
import { Icon } from '../Icon';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const CustomButton = ({
   buttonTitle,
   buttonTitleStyle,
   loading,
   spinnerColor,
   spinnerSize,
   onButtonPressed,
   buttonContainerStyle,
   buttonActiveOpacity,
   icon,
   iconColor,
   iconType,
   iconSize,
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
            <View
               style={{
                  flex: 1,
                  width: '90%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
               }}>
               {icon && (
                  <Icon
                     name={icon}
                     color={iconColor}
                     type={iconType}
                     size={iconSize || responsiveFontSize(2.5)}
                  />
               )}
               <CustomText
                  textStyle={[styles.text, buttonTitleStyle]}
                  text={buttonTitle}
               />
            </View>
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
      borderRadius: 25,
   },
   text: {
      color: WHITE_COLOR,
      fontSize: responsiveFontSize(2.3),
      top: -2,
   },
});

export { CustomButton };
