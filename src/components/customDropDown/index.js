import React, { useRef } from 'react';
import { View, Text, StyleSheet, I18nManager, Image } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import {
   MAIN_COLOR,
   WHITE_COLOR,
   INPUT_BACKGROUND,
   SECOND_ICON_BACKGROUND,
   SURFACE_COLOR,
   SCREEN_HEIGHT,
   SCREEN_WIDTH,
   TEXT_COLOR,
   MAIN_RED_COLOR,
   PLACEHOLDER_COLOR,
   ERROR_RED_COLOR,
} from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { CustomText } from '../customText';
const MaterialDropDown = ({
   containerStyle,
   data,
   label,
   errorTextStyle,
   error,
   name,
   ...res
}) => {
   return (
      <>
         <View style={[styles.container, containerStyle]}>
            <Dropdown
               name={name}
               data={data}
               label={label}
               baseColor={PLACEHOLDER_COLOR}
               itemColor={TEXT_COLOR}
               textColor={TEXT_COLOR} //For Labels in DropDown
               labelFontSize={0} //Size For Animation Label
               containerStyle={styles.inContainer}
               inputContainerStyle={{
                  borderBottomWidth: 0,
                  borderBottomColor: 'transparent',
               }} //Make UnderLine Transparent
               fontSize={responsiveFontSize(2)}
               titleTextStyle={{ color: TEXT_COLOR }} //Color For Fixed Label Title
               itemTextStyle={styles.fontFamily}
               style={styles.inputStyle}
               dropdownOffset={{ top: 12, left: 0 }}
               rippleInsets={{ top: 0 }}
               labelTextStyle={styles.innerLabel}
               inputContainerStyle={{
                  borderBottomWidth: 0,
                  borderBottomColor: 'transparent',
               }}
               pickerStyle={{ backgroundColor: SURFACE_COLOR }}
               rippleOpacity={0} //Hide The Effect Of Opacity
               renderAccessory={() => (
                  <View
                     style={{
                        width: SCREEN_WIDTH / 9,
                        height: SCREEN_HEIGHT / 15,
                        backgroundColor: SECOND_ICON_BACKGROUND,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: -4,
                        borderTopEndRadius: 5,
                        borderBottomEndRadius: 5,
                     }}>
                     <Icon
                        name={'ios-arrow-down'}
                        size={responsiveFontSize(3.5)}
                        color={WHITE_COLOR}
                     />
                  </View>
               )}
               selectedItemColor={MAIN_RED_COLOR}
               placeholderTextColor={WHITE_COLOR}
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
   container: {
      backgroundColor: SURFACE_COLOR,
      width: '100%',
      height: SCREEN_HEIGHT / 15,
      paddingHorizontal: 5,
      marginTop: 0,
      paddingVertical: 0,
      borderRadius: 10,
      borderWidth: 0.7,
      borderColor: WHITE_COLOR,
      marginVertical: 10,
   },
   inContainer: {
      flex: 1,
      overflow: 'hidden',
      // backgroundColor: '#589',
      justifyContent: 'center',
   },
   fontFamily: {
      fontFamily: 'DroidArabicKufi',
   },
   inputStyle: {
      fontSize: responsiveFontSize(2.5),
      fontFamily: 'DroidArabicKufi',
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      height: '100%',
      top: -5,
      marginHorizontal: 5,
   },
   innerLabel: {
      fontFamily: 'DroidArabicKufi',
      marginTop: -7,
      marginStart: 5,
      color: PLACEHOLDER_COLOR,
   },
   errorText: {
      color: ERROR_RED_COLOR,
   },
});

export { MaterialDropDown };
