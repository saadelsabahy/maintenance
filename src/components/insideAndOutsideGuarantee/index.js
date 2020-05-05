import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { CustomButton } from '../Button';
import {
   MAIN_COLOR,
   WHITE_COLOR,
   TEXT_COLOR,
   SCREEN_HEIGHT,
   SECONDART_COLOR,
   SCREEN_WIDTH,
} from '../../constants/colors';
import TextArea from '../TextArea';
import ChechBox from '../checkBox';
import { ImageSelector } from '../ImageSelector';
import BottomSheet from 'reanimated-bottom-sheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomText } from '../customText';

const Gurantee = ({
   onSelectImagesPressed,
   images,
   outGuaranteeSpares,
   inGuaranteeSpares,
   oncloseBottomSheet,
   onCheckItem,
   handlePerview,
   onCommentChange,
   comment,
   loading,
}) => {
   const [selectedButton, setselectedButton] = useState(null);
   const bottomSheetRef = useRef(null);
   const onButtonsPressed = index => {
      setselectedButton(index);
      bottomSheetRef.current.snapTo(SCREEN_HEIGHT - 50);
   };
   const bottomSheetHeader = () => {
      return (
         <View
            style={{
               width: '100%',
               height: 200,
               alignItems: 'center',
               justifyContent: 'center',
               backgroundColor: SECONDART_COLOR,
               borderTopStartRadius: 50,
               borderTopEndRadius: 50,
            }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
               <ImageSelector
                  onSelectImagesPressed={async () => {
                     await bottomSheetRef.current.snapTo(SCREEN_HEIGHT - 50);
                     onSelectImagesPressed();
                  }}
                  images={images}
               />
            </View>
            <View style={styles.inputsContainer}>
               <CustomButton
                  buttonContainerStyle={{
                     width: '47%',
                     height: SCREEN_HEIGHT / 17,
                     borderWidth: selectedButton !== 0 ? 1 : 0,
                     borderColor: MAIN_COLOR,
                     backgroundColor:
                        selectedButton == 0 ? MAIN_COLOR : WHITE_COLOR,
                     borderRadius: Math.round(
                        SCREEN_HEIGHT / 2 + SCREEN_WIDTH / 2
                     ),
                  }}
                  buttonTitleStyle={{
                     color: selectedButton == 0 ? WHITE_COLOR : TEXT_COLOR,
                  }}
                  buttonTitle={'داخل الضمان'}
                  onButtonPressed={() => onButtonsPressed(0)}
               />
               <CustomButton
                  buttonContainerStyle={{
                     width: '47%',
                     height: SCREEN_HEIGHT / 17,
                     borderWidth: selectedButton !== 1 ? 1 : 0,
                     borderColor: MAIN_COLOR,
                     backgroundColor:
                        selectedButton == 1 ? MAIN_COLOR : WHITE_COLOR,
                     borderRadius: Math.round(
                        SCREEN_HEIGHT / 2 + SCREEN_WIDTH / 2
                     ),
                  }}
                  buttonTitleStyle={{
                     color: selectedButton == 1 ? WHITE_COLOR : TEXT_COLOR,
                  }}
                  buttonTitle={'خارج الضمان'}
                  onButtonPressed={() => onButtonsPressed(1)}
               />
            </View>
         </View>
      );
   };

   const renderInner = () => {
      if (selectedButton == 1 || selectedButton == 0) {
         return (
            <View
               style={{
                  height: SCREEN_HEIGHT * 0.7,
                  backgroundColor: SECONDART_COLOR,
                  paddingTop: 20,
                  shadowOffset: { width: 0, height: 5 },
                  shadowRadius: 5,
                  shadowOpacity: 0.7,
                  elevation: 5,
                  alignItems: 'center',
               }}>
               {/*  <KeyboardAwareScrollView
                  enableOnAndroid
                  style={{ flex: 1, width: '100%' }}
                  contentContainerStyle={{ flex: 1 }}> */}
               <View
                  style={{
                     width: '100%',
                     height: SCREEN_HEIGHT * 0.25,
                     justifyContent: 'space-evenly',
                  }}>
                  <FlatList
                     style={{
                        width: '90%',
                        alignSelf: 'center',
                     }}
                     data={
                        selectedButton == 0
                           ? inGuaranteeSpares
                           : outGuaranteeSpares
                     }
                     keyExtractor={(item, index) => `${index}`}
                     renderItem={({
                        item,
                        item: { Id, NameAr, checked, Price },
                        index,
                     }) => {
                        return (
                           <View style={styles.spareContainer}>
                              <ChechBox
                                 index={index}
                                 text={NameAr}
                                 Id={Id}
                                 checked={checked}
                                 onItemPressed={() =>
                                    onCheckItem(index, Id, selectedButton)
                                 }
                              />
                              {selectedButton == 1 && (
                                 <CustomText text={`${Price} ريال`} />
                              )}
                           </View>
                        );
                     }}
                     /* numColumns={2} */
                  />
               </View>
               <View
                  style={{
                     width: '100%',
                     justifyContent: 'space-evenly',
                  }}>
                  <TextArea
                     placeholder={selectedButton == 0 ? 'الحل' : 'الوصف'}
                     value={comment}
                     onChangeText={onCommentChange}
                  />
                  <CustomButton
                     buttonContainerStyle={{
                        alignSelf: 'center',
                        height: 45,
                     }}
                     buttonTitle={
                        selectedButton == 0 ? 'تم الحل' : 'تم المعاينه'
                     }
                     onButtonPressed={() => handlePerview(selectedButton)}
                     loading={loading}
                     spinnerColor={WHITE_COLOR}
                  />
               </View>

               {/* </KeyboardAwareScrollView> */}
            </View>
         );
      } else {
         return (
            <View
               style={{
                  height: SCREEN_HEIGHT - 150,
                  backgroundColor: SECONDART_COLOR,
                  paddingTop: 20,
                  shadowOffset: { width: 0, height: 5 },
                  shadowRadius: 5,
                  shadowOpacity: 0.7,
                  elevation: 5,
                  alignItems: 'center',
               }}
            />
         );
      }
   };
   return (
      <View style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
         <BottomSheet
            renderHeader={bottomSheetHeader}
            snapPoints={['35%', '88%', '35%']}
            renderContent={renderInner}
            enabledBottomInitialAnimation
            ref={bottomSheetRef}
            initialSnap={2}
            onCloseEnd={() => {
               oncloseBottomSheet();
               setselectedButton(null);
            }}
            enabledInnerScrolling={true}
            enabledContentGestureInteraction={false}
         />
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
   },

   inputsContainer: {
      flex: 0.5,
      alignSelf: 'center',
      flexDirection: 'row',
      width: '95%',
      height: '15%',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   spareContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
});

export default Gurantee;
