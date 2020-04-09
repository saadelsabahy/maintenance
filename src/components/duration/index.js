import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateTimeButton from './DateTimePickerButton';
import { WHITE_COLOR } from '../../constants/colors';

const SearchDuration = () => {
   return (
      <View style={[styles.container]}>
         <DateTimeButton
            text={'من تاريخ'}
            iconEnd={'calendar'}
            iconEndType={'material-community'}
            iconEndColor={WHITE_COLOR}
         />
         <DateTimeButton
            text={'الي تاريخ'}
            iconEnd={'calendar'}
            iconEndType={'material-community'}
            iconEndColor={WHITE_COLOR}
         />
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: '35%',
   },
});

export { SearchDuration };
