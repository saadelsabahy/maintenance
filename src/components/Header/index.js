import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from '../IconButton';
import { MAIN_COLOR, WHITE_COLOR } from '../../constants/colors';
import { CustomText } from '../customText';
const Header = ({
   headerText,
   onIconStartPressed,
   onIconEndPressed,
   iconStart,
   iconStartColor,
   iconEnd,
   iconEndColor,
   iconEndSize,
   iconStartSize,
   iconEndText,
   iconStartType,
   iconEndType,
   iconEndBackGround,
   iconStartBackGround,
}) => {
   return (
      <View style={styles.container}>
         <View style={styles.contentContainer}>
            {iconStart && (
               <IconButton
                  iconName={iconStart}
                  iconType={iconStartType}
                  iconColor={iconStartColor || '#fff'}
                  onIconPressed={onIconStartPressed}
                  iconSize={iconStartSize}
                  icoBackGround={iconStartBackGround}
               />
            )}
            {headerText && (
               <CustomText text={headerText} textStyle={styles.headerText} />
            )}
            {iconEnd && (
               <IconButton
                  iconName={iconEnd}
                  iconType={iconEndType}
                  iconColor={iconEndColor || '#fff'}
                  onIconPressed={onIconEndPressed}
                  iconSize={iconEndSize}
                  icoBackGround={iconEndBackGround}
               />
            )}
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: '8%',
      backgroundColor: MAIN_COLOR,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   contentContainer: {
      width: '95%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   headerText: {
      color: WHITE_COLOR,
      fontSize: 18,
      textTransform: 'capitalize',
   },
});

export { Header };
