import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {
   SECONDART_COLOR,
   TEXT_COLOR,
   WHITE_COLOR,
   SCREEN_HEIGHT,
} from '../../constants/colors';
import { CustomText } from '../customText';
import { FlatList } from 'react-native-gesture-handler';
import { ImageSelector } from '../ImageSelector';
import ChechBox from '../checkBox';
const CustomBottomSheet = ({
   source,
   excutionImages,
   onSelectExcutionImages,
}) => {
   const renderInner = () => (
      <View style={styles.panel}>
         <View style={styles.panelHandle} />
         {source === 3 ? (
            <>
               <View
                  style={{ height: '20%', width: '90%', alignSelf: 'center' }}>
                  <ImageSelector
                     images={excutionImages}
                     onSelectImagesPressed={onSelectExcutionImages}
                  />
               </View>
               <View style={{ flex: 0.8, width: '90%', marginBottom: 10 }}>
                  <FlatList
                     style={{ flex: 1 }}
                     contentContainerStyle={{ flexGrow: 1 }}
                     data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                     keyExtractor={(item, index) => `${index}`}
                     renderItem={({ item, index }) => {
                        return (
                           <View
                              style={{
                                 ...styles.bottomSheetItem,
                                 justifyContent: 'flex-start',
                              }}>
                              <ChechBox />
                              <CustomText text={'تغيير أنتنه'} />
                           </View>
                        );
                     }}
                  />
               </View>
            </>
         ) : (
            <>
               <View style={{ flex: 0.8, width: '90%', marginBottom: 10 }}>
                  <FlatList
                     style={{ flex: 1 }}
                     contentContainerStyle={{ flexGrow: 1 }}
                     data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                     keyExtractor={(item, index) => `${index}`}
                     renderItem={({ item, index }) => {
                        return (
                           <View style={styles.bottomSheetItem}>
                              <CustomText text={'تغيير أنتنه'} />
                              <CustomText text={'100 ريال'} />
                           </View>
                        );
                     }}
                  />
               </View>
               <View style={styles.bottomSheetItem}>
                  <CustomText text={'ثمن الزياره'} />
                  <CustomText text={'100 ريال'} />
               </View>
               <View
                  style={[
                     styles.bottomSheetItem,
                     {
                        backgroundColor: TEXT_COLOR,
                        paddingHorizontal: 10,
                        backgroundColor: TEXT_COLOR,
                     },
                  ]}>
                  <CustomText
                     text={'المجموع الكلي'}
                     textStyle={{ color: WHITE_COLOR }}
                  />
                  <CustomText
                     text={'100 ريال'}
                     textStyle={{ color: WHITE_COLOR }}
                  />
               </View>
            </>
         )}
      </View>
   );

   const renderHeader = () => <View style={styles.header} />;
   return (
      <View style={{ flex: 1 }}>
         <BottomSheet
            snapPoints={
               SCREEN_HEIGHT > 800
                  ? ['25%', '90%', '25%']
                  : ['30%', '90%', '30%']
            }
            renderContent={renderInner}
            renderHeader={renderHeader}
            enabledInnerScrolling={false}
            enabledBottomInitialAnimation
            initialSnap={2}
         />
      </View>
   );
};
const IMAGE_SIZE = 200;
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: SECONDART_COLOR,
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
      height: SCREEN_HEIGHT - 50,
      backgroundColor: SECONDART_COLOR,
      paddingTop: 20,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 5,
      shadowOpacity: 0.7,
      elevation: 5,
      alignItems: 'center',
   },
   header: {
      width: '100%',
      height: 50,
      alignItems: 'center',
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
   bottomSheetItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      height: 45,
      width: '90%',
      alignSelf: 'center',
      alignItems: 'center',
   },
});

export { CustomBottomSheet };
