import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import SplashImage from '../../assets/images/gear.png';
import { MAIN_COLOR } from '../../constants/colors';
const Splash = () => {
   return (
      <View style={styles.container}>
         <Image source={SplashImage} style={{ width: 100, height: 100 }} />
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: MAIN_COLOR,
   },
});

export default Splash;
