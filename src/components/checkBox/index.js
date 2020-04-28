import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box';
import { WHITE_COLOR, MAIN_COLOR } from '../../constants/colors';
import { CustomText } from '../customText';

const ChechBox = ({ onItemPressed, text, checked }) => {
   return (
      <TouchableOpacity style={styles.container} onPress={onItemPressed}>
         <CheckBox
            uncheckedCheckBoxColor={MAIN_COLOR}
            checkedCheckBoxColor={MAIN_COLOR}
            style={{ alignItems: 'flex-start' }}
            onClick={onItemPressed}
            isChecked={checked}
         />
         <CustomText text={text} textStyle={{ marginStart: 10 }} />
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
   },
});

export default ChechBox;
