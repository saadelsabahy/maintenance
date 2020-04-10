import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box';
import { WHITE_COLOR, MAIN_COLOR } from '../../constants/colors';
import { CustomText } from '../customText';

const ChechBox = ({ onItemPressed, text }) => {
   const [isChecked, setIsChecked] = useState(false);
   return (
      <TouchableOpacity
         style={styles.container}
         onPress={() => setIsChecked(!isChecked)}>
         <CheckBox
            uncheckedCheckBoxColor={MAIN_COLOR}
            checkedCheckBoxColor={MAIN_COLOR}
            style={{ alignItems: 'flex-start' }}
            onClick={() => {
               setIsChecked(!isChecked);
            }}
            isChecked={isChecked}
         />
         <CustomText text={'قطع الغيار'} />
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   container: {
      backgroundColor: '#cfe',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 3,
   },
});

export default ChechBox;
