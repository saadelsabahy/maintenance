import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { CustomText } from '../customText';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { MAIN_COLOR } from '../../constants/colors';

const EmptyList = ({ iconSize, emptyText }) => {
   return (
      <View style={styles.container}>
         <Icon
            name={'exclamation'}
            size={iconSize || responsiveFontSize(4)}
            color={MAIN_COLOR}
         />
         <CustomText text={emptyText || 'لا يوجد اي بلاغات'} />
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
   },
   text: {
      letterSpacing: 1,
      marginVertical: 5,
      fontSize: 17,
   },
});

export { EmptyList };
