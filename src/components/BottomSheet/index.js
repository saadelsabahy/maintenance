import React, { useRef, useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   ImageBackground,
   Image,
   Platform,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {
   SECONDART_COLOR,
   TEXT_COLOR,
   WHITE_COLOR,
   SCREEN_HEIGHT,
   SURFACE_COLOR,
   MAIN_COLOR,
   SCREEN_WIDTH,
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
import {
   REJECTED,
   WAIT_APPROVAL,
   WAIT_EXCUTION,
   LATE_EXCUTION,
   VISITING_PRICE,
   AMANA_USER,
   EVISION_USER,
   WAIT_PERVIEW,
   LATE_APPROVAL,
} from '../../utils/complainsStutus';

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
   signature,
   handleSaveSignature,
   showSignatureError,
   userName,
   onCheckItem,
   reRenderSpareList,
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
         {source === WAIT_EXCUTION || source === LATE_EXCUTION ? (
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
                     height: SCREEN_HEIGHT * 0.57,
                     width: '100%',
                  }}>
                  <FlatList
                     style={{ flex: 1 }}
                     data={[...spareParts]}
                     extraData={reRenderSpareList}
                     keyExtractor={(item, index) => `${index}`}
                     renderItem={({ item: { checked, NameAr, Id }, index }) => {
                        return (
                           <View
                              style={{
                                 ...styles.bottomSheetItem,
                                 justifyContent: 'flex-start',
                              }}>
                              <ChechBox
                                 checked={checked}
                                 onItemPressed={() => {}}
                                 text={NameAr}
                                 index={index}
                                 text={NameAr}
                                 Id={Id}
                                 onItemPressed={() => onCheckItem(index, Id)}
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
                  top:
                     source == REJECTED ||
                     source == WAIT_APPROVAL ||
                     source == LATE_APPROVAL
                        ? 30
                        : 90,
               }}>
               {(source == REJECTED ||
                  source == WAIT_APPROVAL ||
                  source == LATE_APPROVAL) && (
                  <View
                     style={{
                        padding: 10,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                     }}>
                     <CustomText text={'أمر توريد'} />
                     <CustomText
                        text={` تحريرا في ${moment().format('YYYY/MM/DD')}`}
                        textStyle={{
                           marginVertical: SCREEN_HEIGHT > 850 ? 20 : 10,
                        }}
                     />
                     <View
                        style={{
                           flexDirection: 'row',
                           flexWrap: 'wrap',
                           flex: 1,
                        }}>
                        <CustomText
                           text={`الامر لأجل اصلاح المعده رقم : ${vehicleNumber} في العقد : ${contractorNumber} برجاء توريد وتركيب وتنفيذ الاصناف التاليه :  `}
                           textStyle={{
                              alignSelf: 'flex-start',
                           }}
                           numberOfLines={4}
                        />
                     </View>
                  </View>
               )}
               <View style={styles.sparePartsListContainer}>
                  <FlatList
                     data={[...spareParts]}
                     keyExtractor={({ SparePartId }, index) => `${SparePartId}`}
                     style={{
                        maxHeight: SCREEN_HEIGHT * 0.25,
                     }}
                     persistentScrollbar={true}
                     renderItem={({ item, index }) => {
                        return (
                           <View style={{ ...styles.bottomSheetItem }}>
                              <CustomText
                                 text={item.NameAr}
                                 textStyle={styles.bottomSheetItemText}
                              />
                              <CustomText text={`${+item.Price} ريال`} />
                           </View>
                        );
                     }}
                  />
               </View>
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
                  {(source == REJECTED ||
                     source == WAIT_APPROVAL ||
                     source == LATE_APPROVAL) &&
                     userType != AMANA_USER && (
                        <View style={styles.signatureImageContainer}>
                           <CustomText
                              text={`يعتمد بواسطه :${
                                 signature ? userName : '--------'
                              }`}
                              textStyle={{
                                 color: WHITE_COLOR,
                                 marginVertical: 10,
                                 alignSelf: 'flex-start',
                              }}
                              onPress={handleSignatureModal}
                           />

                           {signature ? (
                              <Image
                                 source={{
                                    uri: `${
                                       Platform.OS == 'ios'
                                          ? `file:///${signature}`
                                          : signature
                                    }?random=${Math.random()
                                       .toString(36)
                                       .substring(7)}`,
                                 }}
                                 style={styles.signatureImage}
                                 resizeMode={'contain'}
                              />
                           ) : null}
                        </View>
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
               '25%',
               source == REJECTED ||
               source == WAIT_APPROVAL ||
               source == LATE_APPROVAL
                  ? SCREEN_HEIGHT - SCREEN_HEIGHT / 6
                  : SCREEN_HEIGHT - SCREEN_HEIGHT / 5,
               '25%',
            ]}
            renderContent={renderInner}
            /*     renderHeader={renderHeader} */
            enabledInnerScrolling={true}
            enabledBottomInitialAnimation
            initialSnap={2}
            ref={bottonSheetReferance}
            onCloseEnd={source === 3 ? oncloseBottomSheet : () => {}}
         />
         <SignatureModal
            isModalVisible={isSignatureModalVisible}
            hideModal={handleSignatureModal}
            handleSaveSignature={handleSaveSignature}
            showSignatureError={showSignatureError}
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
      minHeight: SCREEN_HEIGHT / 14,
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      /*       flexWrap: 'wrap', */
   },
   signatureImageContainer: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT / 6,
   },
   signatureImage: {
      width: SCREEN_WIDTH,
      height: '100%',
      backgroundColor: WHITE_COLOR,
      marginEnd: 40,
   },
   sparePartsListContainer: {
      width: '100%',
      maxHeight: SCREEN_HEIGHT * 0.15,
   },
   bottomSheetItemText: {
      width: '80%',
   },
});

export { CustomBottomSheet };
