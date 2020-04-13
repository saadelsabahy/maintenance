import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
   WHITE_COLOR,
   MAIN_COLOR,
   DASHBOARD_ITEM_ICON_CONTAINER,
   SCREEN_HEIGHT,
} from '../../constants/colors';
import { Icon } from '../Icon';
import { CustomText } from '../customText';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const DashBoardItem = ({
   text,
   number,
   icon,
   iconTtype,
   onDashboardItemPressed,
}) => {
   return (
      <TouchableOpacity
         style={styles.container}
         onPress={() => onDashboardItemPressed(text)}
         activeOpacity={1}>
         <View style={styles.iconContainer}>
            <Icon
               name={icon}
               type={iconTtype}
               color={WHITE_COLOR}
               size={responsiveFontSize(4)}
            />
         </View>
         <View style={styles.cardDetailesContainer}>
            <CustomText text={number} textStyle={styles.textStyle} />
            <CustomText text={text} textStyle={styles.textStyle} />
         </View>
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   container: {
      width: '40%',
      height: '30%',
      backgroundColor: WHITE_COLOR,
      borderTopStartRadius: 30,
      borderBottomEndRadius: 30,
      borderBottomStartRadius: 5,
      borderTopEndRadius: 5,
      justifyContent: 'flex-end',
      marginBottom: '7%',
      elevation: 3,
   },
   iconContainer: {
      backgroundColor: DASHBOARD_ITEM_ICON_CONTAINER,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopStartRadius: 10,
      borderBottomEndRadius: 10,
      borderBottomStartRadius: 3,
      borderTopEndRadius: 3,
      width: '30%',
      height: '30%',
      position: 'absolute',
      end: 10,
      top: '-7%',
   },
   cardDetailesContainer: {
      alignItems: 'flex-start',
      width: '90%',
      height: '50%',
      alignSelf: 'center',
      justifyContent: 'center',
   },
   textStyle: {
      textAlign: 'right',
      fontSize: responsiveFontSize(2.7),
      lineHeight: SCREEN_HEIGHT > 800 ? 70 : 30,
   },
});

export { DashBoardItem };
