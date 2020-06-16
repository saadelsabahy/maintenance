import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { CustomText } from '../../components';
import BackgroundImage from '../../assets/images/app_bg.png';
const AddComplain = () => {
   return (
      <ImageBackground
         source={BackgroundImage}
         style={styles.container}
         resizeMode="stretch">
         <CustomText text="add complain" />
      </ImageBackground>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
});

export default AddComplain;
