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
         style={[{ justifyContent: 'center' }, menuContainerStyle]}>
         {typeof dropDownText == 'string' ? (
            <CustomText
               text={dropDownText != '' ? dropDownText : 'نوع البلاغ'}
               textStyle={{ paddingHorizontal: 20, alignSelf: 'flex-start' }}
            />
         ) : null}
         <Menu button={button} ref={refrence} style={menuStyle}>
            {labels.map((label, index) => {
               return (
                  <View style={{ flex: 1, width: '100%' }} key={index + label}>
                     <MenuItem
                        textStyle={styles.text}
                        onPress={item => {
                           onMenuItemPressed(label);
                        }}
                        style={
                           label === selectedItem
                              ? styles.selectedItem
                              : styles.notSelectedItem
                        }>
                        {label}
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
      backgroundColor: SECONDART_COLOR,
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
