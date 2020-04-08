import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from '../IconButton';
import { MAIN_COLOR, WHITE_COLOR } from '../../constants/colors';
import { CustomText } from '../customText';
const Header = ({ children, headerWrapperStyle, containerStyle }) => {
   return (
      <View style={[styles.container, headerWrapperStyle]}>
         <View style={[styles.contentContainer, containerStyle]}>
            {children}
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: '8%',
      backgroundColor: MAIN_COLOR,
      justifyContent: 'center',
      alignItems: 'center',
   },
   contentContainer: {
      width: '95%',
      height: '95%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
});

export { Header };
