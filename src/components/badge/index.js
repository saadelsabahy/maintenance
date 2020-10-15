import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../customText';
import {
   MAIN_RED_COLOR,
   DASHBOARD_ITEM_ICON_CONTAINER,
} from '../../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Badge = ({ containerStyle, number, onPress }) => {
   return (
      <View style={[styles.container, containerStyle]}>
         <TouchableOpacity
            style={styles.touchable}
            onPress={onPress}
            activeOpacity={1}>
            <CustomText text={`${number}`} />
         </TouchableOpacity>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      width: 25,
      height: 25,
      borderRadius: 25 / 2,
      backgroundColor: DASHBOARD_ITEM_ICON_CONTAINER,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
   },
   touchable: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default Badge;
