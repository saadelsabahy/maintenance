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
      style,
      reverse,
      reverseColor,
      iconContainerStyle,
      iconBackGround,
   } = props;

   const IconComponent = getIconType(type);

   return (
      <View style={[styles.container, iconContainerStyle]}>
         <IconComponent
            testID="iconIcon"
            style={[style]}
            size={size}
            name={name}
            color={reverse ? reverseColor : color}
         />
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 0.3,
      alignItems: 'center',
      justifyContent: 'center',
   },
});

export { Icon };
