import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MAIN_COLOR } from '../../constants/colors';

const CustomImage = ({ imageSource }) => {
   return (
      <View style={[styles.container]}>
         <Image source={{ uri: imageSource }} style={styles.image} />
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      width: 150,
      height: 150,
      borderRadius: 75,
      borderWidth: 1,
      borderColor: MAIN_COLOR,
      overflow: 'hidden',
   },
   image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
   },
});

export { CustomImage };
