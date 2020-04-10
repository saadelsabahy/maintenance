import React, { useState } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import DateTimeButton from './DateTimePickerButton';
import CustomDateTimePicker from './DateTimePicker';
import { WHITE_COLOR } from '../../constants/colors';
const now = new Date();

const SearchDuration = () => {
   const colorScheme = useColorScheme();
   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
   const [currentActive, setCurrentActive] = useState('');
   const [mode, setMode] = useState('date');
   const [startDate, setStartDate] = useState(now.toLocaleDateString());
   const [endDate, setEndDate] = useState(now.toLocaleDateString());

   const showDatePicker = duration => {
      setDatePickerVisibility(true);
      setMode('date');
      setCurrentActive(duration);
   };

   const hideDatePicker = () => {
      setDatePickerVisibility(false);
      setCurrentActive('');
   };

   const handleConfirm = date => {
      hideDatePicker();
      switch (currentActive) {
         case 'startDate':
            setStartDate(date.toLocaleDateString());
            break;

         case 'endDate':
            setEndDate(date.toLocaleDateString());
            break;
      }
   };
   return (
      <View style={[styles.container]}>
         <DateTimeButton
            text={startDate}
            iconEnd={'calendar'}
            iconEndType={'material-community'}
            iconEndColor={WHITE_COLOR}
            onPress={() => showDatePicker('startDate')}
         />
         <DateTimeButton
            text={endDate}
            iconEnd={'calendar'}
            iconEndType={'material-community'}
            iconEndColor={WHITE_COLOR}
            onPress={() => showDatePicker('endDate')}
         />
         <CustomDateTimePicker
            isDatePickerVisible={isDatePickerVisible}
            pickerMode={mode}
            onCancel={hideDatePicker}
            onConfirm={handleConfirm}
            isDarkModeEnabled={colorScheme === 'dark'}
            date={now}
            isDarkModeEnabled={colorScheme == 'dark'}
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
