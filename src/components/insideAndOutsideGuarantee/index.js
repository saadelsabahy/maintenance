import React, { useState, useRef } from 'react';
import {
   View,
   Text,
   StyleSheet,
   ScrollView,
   FlatList,
   ImageBackground,
} from 'react-native';
import { CustomButton } from '../Button';
import {
   MAIN_COLOR,
   WHITE_COLOR,
   TEXT_COLOR,
   SCREEN_HEIGHT,
   SECONDART_COLOR,
   SCREEN_WIDTH,
   SURFACE_COLOR,
   MAIN_RED_COLOR,
} from '../../constants/colors';
import TextArea from '../TextArea';
import ChechBox from '../checkBox';
import { ImageSelector } from '../ImageSelector';
import BottomSheet from 'reanimated-bottom-sheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomText } from '../customText';
import BackgroundImage from '../../assets/images/bottom_sheet.png';
import { showFlashMessage } from '../../utils/flashMessage';
import { IN_WARNTY, OUT_WARNTY } from '../../utils/complainsStutus';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
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
   userType,
}) => {
   const [selectedButton, setselectedButton] = useState(null);
   const bottomSheetRef = useRef(null);
   const onButtonsPressed = index => {
      setselectedButton(index);
      bottomSheetRef.current.snapTo(1);
   };
   console.log('waitView', images);
   const bottomSheetHeader = () => {
      return (
         <ImageBackground
            source={BackgroundImage}
            style={{
               width: '100%',
               height: 200,
               alignItems: 'center',
               justifyContent: 'flex-end',
            }}
            resizeMode="stretch">
            <View
               style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
               }}>
               <ImageSelector
                  onSelectImagesPressed={async () => {
                     await bottomSheetRef.current.snapTo(1);
                     if (
                        selectedButton === IN_WARNTY ||
                        selectedButton === OUT_WARNTY
                     ) {
                        onSelectImagesPressed();
                     } else {
                        showFlashMessage(
                           'danger',
                           'يجب تحديد ما اذاكان العطل  داخل الضمان او خارجه أولا'
                        );
                        return;
                     }
                  }}
                  images={images}
               />
            </View>
            <View style={styles.inputsContainer}>
               <CustomButton
                  buttonContainerStyle={{
                     width: '47%',
                     height: SCREEN_HEIGHT / 17,
                     borderBottomWidth: selectedButton == IN_WARNTY ? 1 : 0,
                     borderColor:
                        selectedButton == IN_WARNTY
                           ? MAIN_RED_COLOR
                           : 'transparent',
                     backgroundColor: 'transparent',
                  }}
                  buttonTitleStyle={{
                     color: TEXT_COLOR,
                  }}
                  buttonTitle={'داخل الضمان'}
                  onButtonPressed={() => {
                     oncloseBottomSheet();
                     onButtonsPressed(IN_WARNTY);
                  }}
               />
               <CustomButton
                  buttonContainerStyle={{
                     width: '47%',
                     height: SCREEN_HEIGHT / 17,
                     borderBottomWidth: selectedButton == OUT_WARNTY ? 1 : 0,
                     borderColor:
                        selectedButton == OUT_WARNTY
                           ? MAIN_RED_COLOR
                           : 'transparent',
                     backgroundColor: 'transparent',
                  }}
                  buttonTitleStyle={{
                     color: TEXT_COLOR,
                  }}
                  buttonTitle={'خارج الضمان'}
                  onButtonPressed={() => {
                     oncloseBottomSheet();
                     onButtonsPressed(OUT_WARNTY);
                  }}
               />
            </View>
         </ImageBackground>
      );
   };

   const renderInner = () => {
      if (selectedButton == OUT_WARNTY || selectedButton == IN_WARNTY) {
         return (
            <View
               style={{
                  height: SCREEN_HEIGHT * 0.7,
                  backgroundColor: '#3A3A3A',
                  paddingTop: 20,
                  shadowOffset: { width: 0, height: 5 },
                  shadowRadius: 5,
                  shadowOpacity: 0.7,
                  elevation: 5,
                  alignItems: 'center',
               }}>
               <ImageBackground
                  source={require('../../assets/images/bgetention.png')}
                  resizeMode="stretch"
                  style={{
                     position: 'absolute',
                     width: '100%',
                     height: '100%',
                  }}
               />
               <View
                  style={{
                     width: '100%',
                     height: SCREEN_HEIGHT * 0.22,
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
                              {selectedButton == OUT_WARNTY && (
                                 <CustomText
                                    text={`${Price} ريال`}
                                    textStyle={{
                                       fontSize: responsiveFontSize(1.6),
                                    }}
                                 />
                              )}
                           </View>
                        );
                     }}
                     /* numColumns={2} */
                  />
               </View>
               <View
                  style={{
                     height: SCREEN_HEIGHT * 0.22,
                     width: '100%',
                     justifyContent: 'space-between',
                     paddingVertical: 10,
                  }}>
                  <TextArea
                     placeholder={
                        selectedButton == IN_WARNTY ? 'الحل' : 'الوصف'
                     }
                     value={comment}
                     onChangeText={onCommentChange}
                     containerStyle={{ height: '60%' }}
                  />
                  {userType == 0 && (
                     <CustomButton
                        buttonContainerStyle={{
                           alignSelf: 'center',
                           height: SCREEN_HEIGHT / 17,
                        }}
                        buttonTitle={
                           selectedButton == IN_WARNTY
                              ? 'تم الحل'
                              : 'تم المعاينه'
                        }
                        onButtonPressed={() => handlePerview(selectedButton)}
                        loading={loading}
                        spinnerColor={WHITE_COLOR}
                     />
                  )}
               </View>

               {/* </KeyboardAwareScrollView> */}
            </View>
         );
      } else {
         return (
            <View
               style={{
                  height: SCREEN_HEIGHT - 150,
                  backgroundColor: '#3A3A3A',
                  /*  paddingTop: 20,
                  shadowOffset: { width: 0, height: 5 },
                  shadowRadius: 5,
                  shadowOpacity: 0.7,
                  elevation: 5,
                  alignItems: 'center', */
               }}
            />
         );
      }
   };
   return (
      <View style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
         <BottomSheet
            renderHeader={bottomSheetHeader}
            snapPoints={['30%', SCREEN_HEIGHT - SCREEN_HEIGHT / 5, '30%']}
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
      marginVertical: 5,
   },
});

export default Gurantee;
