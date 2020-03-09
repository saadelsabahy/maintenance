import React from 'react';

import getIconType from '../../utils/getIconType';
import { View, StyleSheet } from 'react-native';
import { MAIN_COLOR } from '../../constants/colors';

const Icon = props => {
   const {
      type,
      name,
      size,
      color,
      iconStyle,
      reverse,
      reverseColor,
      iconContainerStyle,
   } = props;

   const IconComponent = getIconType(type);

   return (
      <View style={[styles.container, iconContainerStyle]}>
         <IconComponent
            testID="iconIcon"
            style={[iconStyle]}
            size={size}
            name={name}
            color={reverse ? reverseColor : color}
         />
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: MAIN_COLOR,
      borderTopStartRadius: 5,
      borderBottomStartRadius: 5,
   },
});

export { Icon };
