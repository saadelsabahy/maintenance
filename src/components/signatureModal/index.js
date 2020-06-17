import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import SignatureCapture from 'react-native-signature-capture';
import { SCREEN_HEIGHT, WHITE_COLOR } from '../../constants/colors';
import { CustomButton } from '../Button';
const SignatureModal = ({
   hideModal,
   isModalVisible,
   backdropColor,
   backdropOpacity,
}) => {
   const signatureRef = useRef(null);
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
               saveImageFileInExtStorage={false}
               showNativeButtons={false}
               showTitleLabel={false}
               ref={signatureRef}
               onSaveEvent={res => {
                  console.log('signature', res);
               }}
            />
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
         </View>
      </Modal>
   );
};
const styles = StyleSheet.create({
   button: {
      width: '30%',
      borderRadius: 5,
   },
});

export { SignatureModal };
