import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
   ImageCarousel,
   Header,
   Icon,
   ComplainsItem,
   CustomBottomSheet,
} from '../../components';
import {
   WHITE_COLOR,
   MAIN_COLOR,
   SECONDART_COLOR,
} from '../../constants/colors';
const WaitApproval = ({ navigation }) => {
   return (
      <View style={styles.container}>
         <Header>
            <View style={styles.headerIconContainer}>
               <Icon
                  name={'ios-arrow-back'}
                  type={'ionicon'}
                  color={WHITE_COLOR}
                  iconContainerStyle={{ flex: 1 }}
                  style={{ transform: [{ rotateY: '-180deg' }] }}
                  onPress={() => navigation.goBack()}
               />
            </View>
            <View style={styles.headerIconContainer}>
               <Icon
                  name={'list-unordered'}
                  type={'octicon'}
                  color={WHITE_COLOR}
                  iconContainerStyle={{ flex: 1 }}
               />
            </View>
         </Header>
         <View style={{ width: '100%', height: '40%' }}>
            <ImageCarousel />
         </View>
         <View style={styles.detailesContainer}>
            <ComplainsItem
               containerStyle={styles.complainsItemContainer}
               complainNumber={254555}
               complainDate={'25/5/2020'}
               vehicleCode={'2548as4'}
               vehicleNumber={25}
               vehicleType={'jsubn282'}
               contractorNumber={81}
               indicatorColor={'#0f0'}
            />
            <View style={styles.bottomSheetContainer}>
               <CustomBottomSheet />
            </View>
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   headerIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: MAIN_COLOR,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 2,
      shadowOffset: { width: 0, height: 5 },
      shadowColor: '#000',
      shadowOpacity: 0.7,
      elevation: 10,
   },
   detailesContainer: {
      flex: 1,
      backgroundColor: WHITE_COLOR,
      borderTopStartRadius: 50,
      paddingHorizontal: 10,
   },
   complainsItemContainer: {
      flex: 1,
      borderRadius: 0,
      borderTopStartRadius: 50,
   },
   bottomSheetContainer: {
      flex: 1,
   },
});

export default WaitApproval;
