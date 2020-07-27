import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
   WHITE_COLOR,
   MAIN_COLOR,
   DASHBOARD_ITEM_ICON_CONTAINER,
   SCREEN_HEIGHT,
   SURFACE_COLOR,
   SCREEN_WIDTH,
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
            <CustomText text={`${number}`} textStyle={styles.textStyle} />
            <CustomText text={text} textStyle={styles.textStyle} />
         </View>
      </TouchableOpacity>
   );
};
const styles = StyleSheet.create({
   container: {
      width: SCREEN_WIDTH / 2 - 20,
      height: SCREEN_HEIGHT / 5,
      backgroundColor: SURFACE_COLOR,
      borderRadius: 20,
      justifyContent: 'center',
      marginBottom: '7%',
      overflow: 'hidden',
      marginHorizontal: 8,
      /*elevation: 3,
      shadowOffset: { width: 0, height: 3 },
      shadowColor: '#000',
      shadowOpacity: 0.5,
      shadowRadius: 20,*/
   },
   iconContainer: {
      backgroundColor: DASHBOARD_ITEM_ICON_CONTAINER,
      alignItems: 'center',
      justifyContent: 'center',
      /*    borderTopStartRadius: 10,
      borderBottomEndRadius: 10,
      borderBottomStartRadius: 3,
      borderTopEndRadius: 3, */
      width: '30%',
      height: '30%',
      alignSelf: 'flex-end',

      // position: 'absolute',
      // end: 5,
      // top: 0,
   },
   cardDetailesContainer: {
      flex: 1,
      alignItems: 'flex-start',
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'flex-end',
      padding: 10,
   },
   textStyle: {
      textAlign: 'right',
      fontSize: responsiveFontSize(2.7),
   },
});

export { DashBoardItem };
