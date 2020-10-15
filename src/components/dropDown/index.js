import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Icon } from '../Icon';
import {
   WHITE_COLOR,
   SECONDART_COLOR,
   TEXT_COLOR,
   SCREEN_WIDTH,
   SCREEN_HEIGHT,
   MAIN_COLOR,
   SURFACE_COLOR,
   MAIN_RED_COLOR,
   PLACEHOLDER_COLOR,
} from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { CustomText } from '../customText';

const CustomDropDown = ({
   labels,
   onMenuItemPressed,
   selectedItem,
   menuContainerStyle,
   menuStyle,
   button,
   refrence,
   onDropDownPressed,
   dropDownText,
}) => {
   return (
      <TouchableOpacity
         onPress={onDropDownPressed}
         activeOpacity={1}
         style={[{ justifyContent: 'center' }, menuContainerStyle]}>
         {typeof dropDownText == 'string' ? (
            <View
               style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
               }}>
               <CustomText
                  text={dropDownText != '' ? dropDownText : 'نوع البلاغ'}
                  textStyle={{
                     paddingHorizontal: 20,
                     alignSelf: 'center',
                     color: !dropDownText ? PLACEHOLDER_COLOR : WHITE_COLOR,
                  }}
               />
               <View
                  style={{
                     justifyContent: 'center',
                     alignItems: 'center',
                     paddingHorizontal: 10,
                     /*    backgroundColor: MAIN_COLOR,
                     borderRadius: Math.round(
                        SCREEN_HEIGHT / 2 + SCREEN_WIDTH / 2
                     ),
                     width:
                        Math.round(SCREEN_HEIGHT / 2 + SCREEN_WIDTH / 2) / 12,
                     height:
                        Math.round(SCREEN_HEIGHT / 2 + SCREEN_WIDTH / 2) / 12, */
                  }}>
                  <Icon
                     name={'keyboard-arrow-down'}
                     type="materialIcon"
                     color={WHITE_COLOR}
                  />
               </View>
            </View>
         ) : null}
         <Menu
            button={button}
            ref={refrence}
            style={[
               {
                  backgroundColor: SURFACE_COLOR,
                  borderWidth: 0.7,
                  borderColor: WHITE_COLOR,
               },
               menuStyle,
            ]}>
            {labels.map((label, index) => {
               return (
                  <View style={{ flex: 1, width: '100%' }} key={index + label}>
                     <MenuItem
                        textStyle={styles.text}
                        onPress={item => {
                           onMenuItemPressed(label);
                        }}
                        style={
                           selectedItem && label.id === selectedItem.id
                              ? styles.selectedItem
                              : styles.notSelectedItem
                        }>
                        {label.text}
                     </MenuItem>
                  </View>
               );
            })}
         </Menu>
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   selectedItem: {
      backgroundColor: MAIN_RED_COLOR,
      width: '100%',
      maxHeight: SCREEN_HEIGHT,
      maxWidth: SCREEN_WIDTH,
   },
   notSelectedItem: {
      width: '100%',
      maxHeight: SCREEN_HEIGHT,
      maxWidth: SCREEN_WIDTH,
   },
   text: {
      fontFamily: 'DroidArabicKufi',
      textTransform: 'capitalize',
      fontSize: responsiveFontSize(2),
      color: TEXT_COLOR,
   },
});

export { CustomDropDown };
