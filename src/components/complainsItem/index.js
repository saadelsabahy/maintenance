import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
   WHITE_COLOR,
   SCREEN_HEIGHT,
   SURFACE_COLOR,
} from '../../constants/colors';
import { CustomText } from '../customText';

const ComplainsItem = ({
   complainNumber,
   complainDate,
   vehicleCode,
   vehicleNumber,
   vehicleType,
   contractorNumber,
   indicatorColor,
   onComplainPressed,
   containerStyle,
   complainStatus,
   images,
   spareParts,
   covered,
}) => {
   return (
      <TouchableOpacity
         style={[styles.container, containerStyle]}
         activeOpacity={1}
         onPress={() =>
            onComplainPressed({
               complainNumber,
               complainDate,
               vehicleCode,
               vehicleNumber,
               vehicleType,
               contractorNumber,
               indicatorColor,
               complainStatus,
               images,
               spareParts,
               covered,
            })
         }>
         <View
            style={[styles.indicator, { backgroundColor: indicatorColor }]}
         />
         <View style={styles.detailsContainer}>
            <CustomText text={`رقم البلاغ : ${complainNumber}`} />
            <CustomText text={`تاريخ البلاغ : ${complainDate}`} />
            <CustomText text={`نوع المعده : ${vehicleType}`} />
            <CustomText text={`كود المعده : ${vehicleCode}`} />
            <CustomText text={`رقم اللوحه : ${vehicleNumber}`} />
            <CustomText text={`العقد : ${contractorNumber}`} />
         </View>
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: SCREEN_HEIGHT / 4.5,
      backgroundColor: SURFACE_COLOR,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      alignItems: 'center',
      marginBottom: 10,
   },
   indicator: {
      width: '1%',
      height: '90%',
      borderRadius: 5,
      backgroundColor: 'red',
   },
   detailsContainer: {
      flex: 0.97,
      alignSelf: 'center',
      lineHeight: 20,
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
   },
});

export { ComplainsItem };
