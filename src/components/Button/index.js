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
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}>
               {icon && (
                  <Icon
                     name={icon}
                     color={iconColor}
                     type={iconType}
                     style={{}}
                     size={iconSize || 20}
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
      marginVertical: 10,
   },
   text: {
      color: WHITE_COLOR,
      textTransform: 'capitalize',
      fontSize: 15,
      letterSpacing: 0.8,
      marginHorizontal: 10,
      alignSelf: 'center',
      textAlign: 'center',
   },
});

export { CustomButton };
