import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { CustomText } from '../customText';

const Triangle = () => {
   return (
      <View style={styles.container}>
         <View style={styles.TriangleShape}>
            <Image
               source={require('../../assets/images/mm_wared.png')}
               style={{ width: '100%', height: '100%' }}
            />
            <CustomText
               text={'10'}
               textStyle={{
                  position: 'absolute',
                  end: 10,
                  top: 20,
                  fontSize: 20,
                  color: '#fff',
               }}
            />

            <CustomText
               text={'وارد'}
               textStyle={{
                  position: 'absolute',
                  end: 10,
                  top: 20,
                  fontSize: 20,
                  color: '#fff',
                  top: 40,
               }}
            />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
   },

   TriangleShape: {
      width: 115,
      height: 100,
      /*   borderLeftWidth: 60,
      borderRightWidth: 80,
      borderBottomWidth: 200,
      borderStyle: 'solid',
      backgroundColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: '#7852',
      transform: [{ rotate: '90deg' }],
      alignItems: 'center',
      justifyContent: 'flex-start', */
   },
});
export { Triangle };
