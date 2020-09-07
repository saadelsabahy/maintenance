import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CheckBox from 'react-native-check-box';
import { WHITE_COLOR, MAIN_COLOR } from '../../constants/colors';
import { CustomText } from '../customText';
import UncheckedImage from '../../assets/images/checkbox.png';
import CheckedImage from '../../assets/images/checkbox_cs.png';
const ChechBox = ({ onItemPressed, text, checked }) => {
   return (
      <TouchableOpacity style={styles.container} onPress={onItemPressed}>
         <CheckBox
            uncheckedCheckBoxColor={MAIN_COLOR}
            checkedCheckBoxColor={MAIN_COLOR}
            style={{ height: '100%' }}
            onClick={onItemPressed}
            isChecked={checked}
            checkedImage={
               <Image
                  source={CheckedImage}
                  style={{ width: 30, height: 30, resizeMode: 'cover' }}
               />
            }
            unCheckedImage={
               <Image
                  source={UncheckedImage}
                  style={{ width: 30, height: 30, resizeMode: 'cover' }}
               />
            }
         />
         <View style={{ flex: 1 }}>
            <CustomText text={text} textStyle={{ marginStart: 10 }} />
         </View>
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      maxWidth: '80%',
      flexWrap: 'wrap',
   },
});

export default ChechBox;
