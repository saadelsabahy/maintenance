import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { CustomButton } from '../Button';
import { MAIN_COLOR, WHITE_COLOR, TEXT_COLOR } from '../../constants/colors';
import TextArea from '../TextArea';
import ChechBox from '../checkBox';

const Gurantee = () => {
   const [selectedButton, setselectedButton] = useState(0);
   return (
      <View style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
         <View style={styles.inputsContainer}>
            <CustomButton
               buttonContainerStyle={{
                  width: '47%',
                  height: 45,
                  borderWidth: selectedButton !== 0 ? 1 : 0,
                  borderColor: MAIN_COLOR,
                  backgroundColor:
                     selectedButton == 0 ? MAIN_COLOR : WHITE_COLOR,
               }}
               buttonTitleStyle={{
                  color: selectedButton == 0 ? WHITE_COLOR : TEXT_COLOR,
               }}
               buttonTitle={'داخل الضمان'}
               onButtonPressed={() => setselectedButton(0)}
            />
            <CustomButton
               buttonContainerStyle={{
                  width: '47%',
                  height: 45,
                  borderWidth: selectedButton !== 1 ? 1 : 0,
                  borderColor: MAIN_COLOR,
                  backgroundColor:
                     selectedButton == 1 ? MAIN_COLOR : WHITE_COLOR,
               }}
               buttonTitleStyle={{
                  color: selectedButton == 1 ? WHITE_COLOR : TEXT_COLOR,
               }}
               buttonTitle={'خارج الضمان'}
               onButtonPressed={() => setselectedButton(1)}
            />
         </View>
         <View style={{ width: '100%' }}>
            <FlatList
               data={['1', '2', '3', '4']}
               keyExtractor={(item, index) => `${index}`}
               renderItem={({ item, index }) => {
                  return <ChechBox />;
               }}
            />
         </View>
         <TextArea />
         <CustomButton
            buttonContainerStyle={{ alignSelf: 'center', height: 45 }}
         />
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'space-evenly',
   },

   inputsContainer: {
      alignSelf: 'center',
      flexDirection: 'row',
      width: '95%',
      height: '15%',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
});

export default Gurantee;
