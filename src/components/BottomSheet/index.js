import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {
   SECONDART_COLOR,
   TEXT_COLOR,
   WHITE_COLOR,
   SCREEN_HEIGHT,
   SURFACE_COLOR,
   MAIN_COLOR,
} from '../../constants/colors';
import { CustomText } from '../customText';
import { FlatList } from 'react-native-gesture-handler';
import { ImageSelector } from '../ImageSelector';
import ChechBox from '../checkBox';
import Reactotron from 'reactotron-react-native';
import BackgroundImage from '../../assets/images/popup.png';
import moment from 'moment';
import { SignatureModal } from '../signatureModal';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
const VISITING_PRICE = 50;
const CustomBottomSheet = ({
   source,
   excutionImages,
   onSelectExcutionImages,
   spareParts,
   oncloseBottomSheet,
   userType,
   vehicleNumber,
   contractorNumber,
   handleSignatureModal,
   isSignatureModalVisible,
}) => {
   const TOTAL_PRICE = spareParts.reduce(
      (acc, val) => +acc + +val.Price,
      VISITING_PRICE
   );
   const bottonSheetReferance = useRef(null);
   const renderInner = () => (
      <ImageBackground
         source={BackgroundImage}
         style={styles.panel}
         resizeMode="stretch">
         {source === 3 ? (
            <View
               style={{
                  width: '90%',
                  position: 'absolute',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  top: 90,
               }}>
               {userType == 0 && (
                  <View style={{ height: '15%', width: '100%' }}>
                     <ImageSelector
                        images={excutionImages}
                        onSelectImagesPressed={async () => {
                           await bottonSheetReferance.current.snapTo(
                              SCREEN_HEIGHT - 50
                           );
                           onSelectExcutionImages();
                        }}
                     />
                  </View>
               )}
               <View
                  style={{
                     width: '100%',
                  }}>
                  <FlatList
                     style={{ flex: 1 }}
                     data={[...spareParts]}
                     keyExtractor={(item, index) => `${index}`}
                     renderItem={({ item, index }) => {
                        return (
                           <View
                              style={{
                                 ...styles.bottomSheetItem,
                                 justifyContent: 'flex-start',
                              }}>
                              <ChechBox
                                 checked={true}
                                 onItemPressed={() => {}}
                                 text={item.NameAr}
                              />
                           </View>
                        );
                     }}
                  />
               </View>
            </View>
         ) : (
            <View
               style={{
                  width: '90%',
                  position: 'absolute',
                  top: source == 5 ? 30 : 90,
               }}>
               {source == 5 && (
                  <View
                     style={{
                        padding: 10,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                     }}>
                     <CustomText text={'أمر توريد'} />
                     <CustomText
                        text={` تحريرا في ${moment().format('DD-MM-YYYY')}`}
                        textStyle={{
                           marginVertical: SCREEN_HEIGHT > 850 ? 20 : 5,
                        }}
                     />
                     <View
                        style={{
                           flexDirection: 'row',
                           flexWrap: 'wrap',
                           flex: 1,
                           flexShrink: 1,
                        }}>
                        <CustomText
                           text={`الامر لأجل اصلاح المعده رقم :- ${vehicleNumber} في العقد :- ${contractorNumber} برجاء توريد وتركيب وتنفيذ الاصناف التاليه : - `}
                           textStyle={{
                              alignSelf: 'flex-start',
                           }}
                           numberOfLines={3}
                        />
                     </View>
                  </View>
               )}
               <FlatList
                  data={[...spareParts]}
                  keyExtractor={(item, index) => `${index}`}
                  style={{
                     maxHeight:
                        source == 5 ? SCREEN_HEIGHT * 0.3 : SCREEN_HEIGHT * 0.6,
                  }}
                  renderItem={({ item, index }) => {
                     return (
                        <View style={styles.bottomSheetItem}>
                           <CustomText text={item.NameAr} />
                           <CustomText text={`${+item.Price} ريال`} />
                        </View>
                     );
                  }}
               />
               <View
                  style={{
                     marginVertical: 10,
                     borderTopWidth: 0.7,
                     borderTopColor: WHITE_COLOR,
                  }}>
                  <View style={styles.bottomSheetItem}>
                     <CustomText text={'ثمن الزياره'} />
                     <CustomText text={`${VISITING_PRICE}ريال`} />
                  </View>
                  <View
                     style={[
                        styles.bottomSheetItem,
                        {
                           backgroundColor: MAIN_COLOR,
                           paddingHorizontal: 10,
                        },
                     ]}>
                     <CustomText
                        text={'المجموع الكلي'}
                        textStyle={{ color: WHITE_COLOR }}
                     />
                     <CustomText
                        text={`${TOTAL_PRICE}ريال`}
                        textStyle={{ color: WHITE_COLOR }}
                     />
                  </View>
                  {source == 5 && (
                     <CustomText
                        text={'يعتمد بواسطه :--------'}
                        textStyle={{
                           color: WHITE_COLOR,
                           marginVertical: 10,
                           alignSelf: 'flex-start',
                        }}
                        onPress={handleSignatureModal}
                     />
                  )}
               </View>
            </View>
         )}
      </ImageBackground>
   );

   const renderHeader = () => <View style={styles.header} />;
   return (
      <View style={{ flex: 1 }}>
         <BottomSheet
            snapPoints={[
               '26%',
               source == 5
                  ? SCREEN_HEIGHT - SCREEN_HEIGHT / 7
                  : SCREEN_HEIGHT - SCREEN_HEIGHT / 5,
               '26%',
            ]}
            renderContent={renderInner}
            /*     renderHeader={renderHeader} */
            enabledInnerScrolling={false}
            enabledBottomInitialAnimation
            initialSnap={2}
            ref={bottonSheetReferance}
            onCloseEnd={source === 3 ? oncloseBottomSheet : () => {}}
         />
         <SignatureModal
            isModalVisible={isSignatureModalVisible}
            hideModal={handleSignatureModal}
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
      height: SCREEN_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center',
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
      height: SCREEN_HEIGHT / 14,
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
   },
});

export { CustomBottomSheet };
