import React from 'react';
import { View, Text, StyleSheet, I18nManager } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Triangle } from '../triangle';
import { CustomText } from '../customText';

const OrderTrackCard = () => {
   return (
      <View style={[styles.item, styles.itemIn]}>
         <View style={[styles.balloon, { backgroundColor: 'grey' }]}>
            <CustomText
               textStyle={{ paddingTop: 5, color: 'white' }}
               text={'وارد'}
            />
         </View>
         <Triangle />
      </View>
   );
};
const styles = StyleSheet.create({
   item: {
      width: '70%',
      height: '12%',
      marginVertical: 7,
      flexDirection: 'row',
   },
   itemIn: {
      marginLeft: 20,
   },
   itemOut: {
      alignSelf: 'flex-end',
      marginRight: 20,
   },
   balloon: {
      width: '100%',
      height: '100%',
      paddingHorizontal: 5,
      paddingTop: 5,
      paddingBottom: 7,
      borderRadius: 5,
   },
   arrowContainer: {
      position: 'absolute',
      top: '50%',
   },
   arrowLeftContainer: {
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
   },

   arrowRightContainer: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
   },

   arrowLeft: {
      left: -5,
   },

   arrowRight: {
      right: -6,
   },
});

export { OrderTrackCard };
