import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import DateTimeButton from './DateTimePickerButton';
import CustomDateTimePicker from './DateTimePicker';
import { WHITE_COLOR } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { onSearchInputsChange } from '../../redux/actions';
import moment from 'moment';
import { date } from '@nozbe/watermelondb/decorators';
const now = new Date();

const SearchDuration = ({ modalMessage }) => {
   const dispatch = useDispatch();
   const colorScheme = useColorScheme();
   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
   const [currentActive, setCurrentActive] = useState('');
   const [mode, setMode] = useState('date');
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');

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
            /*  const isStartDateValid = moment(date).isSameOrAfter(
               moment()
            );
            if (isStartDateValid) {
              
            } else {
               showFlashMessage('danger','')
            } */
            setStartDate(date.toLocaleDateString());
            dispatch(onSearchInputsChange('startDate', date));
            break;

         case 'endDate':
            const isEndDateValid = moment(date).isSameOrAfter(
               moment(startDate, 'MM/DD/YY')
            );
            if (isEndDateValid) {
               setEndDate(date.toLocaleDateString());
               dispatch(onSearchInputsChange('endDate', date));
            } else {
               modalMessage.current.showMessage({
                  type: 'danger',
                  message: 'تاريخ الانتهاء يجب ان يكون بعد تاريخ البدايه',
               });
            }
            break;
      }
   };
   return (
      <View style={[styles.container]}>
         <DateTimeButton
            text={startDate == '' ? 'من تاريخ' : startDate}
            iconEnd={'calendar'}
            iconEndType={'material-community'}
            iconEndColor={WHITE_COLOR}
            onPress={() => showDatePicker('startDate')}
         />
         <DateTimeButton
            text={endDate == '' ? 'إلي تاريخ' : endDate}
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
