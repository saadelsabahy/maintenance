import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import Modal from 'react-native-modal';
import SignatureCapture from 'react-native-signature-capture';
import { SCREEN_HEIGHT, WHITE_COLOR } from '../../constants/colors';
import { CustomButton } from '../Button';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import FlashMessage from 'react-native-flash-message';
//const imgUri = Platform.OS === 'android' ? 'file://' + result.pathName : result.pathName;
const SignatureModal = ({
   hideModal,
   isModalVisible,
   backdropColor,
   backdropOpacity,
   handleSaveSignature,
   showSignatureError,
}) => {
   const signatureRef = useRef(null);
   const signatureFlashRef = useRef();
   useEffect(() => {
      signatureFlashRef?.current?.showMessage({
         type: 'danger',
         message: 'برجاء التوقيع اولا',
      });
      return () => {};
   }, [showSignatureError]);

   const [selectedImage, setselectedImage] = useState('');
   // console.log('signature', `file://${selectedImage}`);
   return (
      <Modal
         style={styles.container}
         isVisible={isModalVisible}
         onBackButtonPress={hideModal}
         coverScreen
         backdropOpacity={backdropOpacity || 0.6}
         backdropColor={backdropColor || '#000'}>
         <View style={{ flex: 1 }}>
            <SignatureCapture
               style={{ flex: 0.8, width: '100%', marginTop: 50 }}
               viewMode={'portrait'}
               saveImageFileInExtStorage={true}
               showNativeButtons={false}
               showTitleLabel={false}
               ref={signatureRef}
               onSaveEvent={res => {
                  handleSaveSignature(
                     Platform.OS === 'android'
                        ? `file://${res.pathName}`
                        : res.pathName
                  );
                  hideModal();
               }}
            />
            {/*  {selectedImage ? (
               <Image
                  style={{ width: 150, height: 150, backgroundColor: 'red' }}
                  source={
                     selectedImage && {
                        uri:selectedImage
                           
                     }
                  }
               />
            ) : null} */}
            <View
               style={{
                  height: SCREEN_HEIGHT / 8,
                  flexDirection: 'row',
                  backgroundColor: WHITE_COLOR,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
               }}>
               <CustomButton
                  buttonContainerStyle={styles.button}
                  buttonTitle={'حفظ'}
                  onButtonPressed={() => {
                     signatureRef.current.saveImage();
                  }}
               />
               <CustomButton
                  buttonContainerStyle={styles.button}
                  buttonTitle={'مسح'}
                  onButtonPressed={() => signatureRef.current.resetImage()}
               />
               <CustomButton
                  buttonContainerStyle={styles.button}
                  buttonTitle={'رجوع'}
                  onButtonPressed={hideModal}
               />
            </View>
            <FlashMessage
               ref={signatureFlashRef}
               position={'bottom'}
               textStyle={styles.flashText}
               titleStyle={styles.flashText}
               duration={2500}
               style={styles.flashMessage}
            />
         </View>
      </Modal>
   );
};
const styles = StyleSheet.create({
   container: { flex: 1 },
   button: {
      width: '30%',
      borderRadius: 5,
   },
   flashText: {
      fontFamily: 'DroidArabicKufi',
      textTransform: 'capitalize',
      fontSize: responsiveFontSize(2),
      lineHeight: responsiveFontSize(3),
      alignSelf: 'center',
   },
   flashMessage: {
      justifyContent: 'center',
   },
});

export { SignatureModal };
