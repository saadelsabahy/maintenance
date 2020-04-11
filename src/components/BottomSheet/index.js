import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { SECONDART_COLOR } from '../../constants/colors';
import { CustomText } from '../customText';
const CustomBottomSheet = () => {
   const renderInner = () => (
      <View style={styles.panel}>
         <View
            style={{
               flexDirection: 'row',
               justifyContent: 'space-between',
               width: '100%',
            }}>
            <CustomText text={'تغيير أنتنه'} />
            <CustomText text={'100 ريال'} />
         </View>
      </View>
   );

   const renderHeader = () => <View style={styles.header} />;
   return (
      <View style={{ flex: 1 }}>
         <BottomSheet
            snapPoints={[350, 200, 0]}
            renderContent={renderInner}
            renderHeader={renderHeader}
            enabledInnerScrolling={true}
            initialSnap={1}
            enabledBottomInitialAnimation
         />
      </View>
   );
};
const IMAGE_SIZE = 200;
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#2c2c2f',
   },
   box: {
      width: IMAGE_SIZE,
      height: IMAGE_SIZE,
   },
   panelContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
   },
   panel: {
      height: 600,
      padding: 20,
      backgroundColor: SECONDART_COLOR,
      paddingTop: 20,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 5,
      shadowOpacity: 0.7,
      elevation: 5,
   },
   header: {
      width: '100%',
      height: 50,
   },
   panelHeader: {
      alignItems: 'center',
   },
   panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
   },
   panelTitle: {
      fontSize: 27,
      height: 35,
   },
   panelSubtitle: {
      fontSize: 14,
      color: 'gray',
      height: 30,
      marginBottom: 10,
   },
   panelButton: {
      padding: 20,
      borderRadius: 10,
      backgroundColor: '#292929',
      alignItems: 'center',
      marginVertical: 10,
   },
   panelButtonTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
   },
   photo: {
      width: '100%',
      height: 225,
      marginTop: 30,
   },
   map: {
      height: '100%',
      width: '100%',
   },
});

export { CustomBottomSheet };
