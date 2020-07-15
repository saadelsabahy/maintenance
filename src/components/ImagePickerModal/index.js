import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Modal from 'react-native-modal';
import { WHITE_COLOR, SURFACE_COLOR } from '../../constants/colors';
import BackgroundImage from '../../assets/images/popup.png';
import { CustomText } from '../customText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { CustomButton } from '../Button';

const ImagePickerModal = ({
   toggleModal,
   isModalVisible,
   onOpenCamerapressed,
   onOpenGallerypressed,
}) => {
   return (
      <Modal
         isVisible={isModalVisible}
         style={{ margin: 0, justifyContent: 'flex-end' }}
         onBackButtonPress={toggleModal}
         coverScreen={true}>
         <View style={styles.contentContainer}>
            <ImageBackground
               source={BackgroundImage}
               resizeMode="stretch"
               style={styles.contentWrapper}>
               <CustomText text="اختيار صور من " textStyle={styles.title} />
               <Icon
                  name="close"
                  color={WHITE_COLOR}
                  size={responsiveFontSize(4)}
                  style={styles.closeIcon}
                  onPress={toggleModal}
               />
               <View style={styles.buttonsContainer}>
                  <CustomButton
                     buttonTitle="الكاميرا"
                     onButtonPressed={onOpenCamerapressed}
                  />
                  <CustomButton
                     buttonTitle="معرض الصور"
                     onButtonPressed={onOpenGallerypressed}
                  />
               </View>
            </ImageBackground>
         </View>
      </Modal>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   contentContainer: {
      width: '100%',
      height: '40%',
   },
   contentWrapper: {
      width: '100%',
      height: '100%',
   },
   title: {
      marginVertical: 15,
      marginStart: 10,
   },
   closeIcon: {
      position: 'absolute',
      end: 15,
      top: -15,
   },
   buttonsContainer: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
   },
});

export { ImagePickerModal };
