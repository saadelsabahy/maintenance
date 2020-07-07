import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from '../IconButton';
import {
   MAIN_COLOR,
   WHITE_COLOR,
   SURFACE_COLOR,
   SCREEN_HEIGHT,
} from '../../constants/colors';
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
      height: SCREEN_HEIGHT / 13,
      backgroundColor: SURFACE_COLOR,
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
