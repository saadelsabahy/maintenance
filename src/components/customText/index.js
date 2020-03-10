import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomText = ({ text, textStyle, props }) => {
   return (
      <Text style={[styles.text, textStyle]} {...props}>
         {text}
      </Text>
   );
};
const styles = StyleSheet.create({
   text: {
      fontFamily: 'DroidArabicKufi',
   },
});

export { CustomText };
