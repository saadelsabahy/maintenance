import React, { useState, useEffect } from 'react';
import {
   View,
   Text,
   StyleSheet,
   ImageBackground,
   KeyboardAvoidingView,
   Platform,
} from 'react-native';
import {
   Header,
   Icon,
   ComplainsItem,
   ImageCarousel,
   CustomButton,
   ImageSelector,
   CustomText,
   ImagePickerModal,
} from '../../components';
import {
   WHITE_COLOR,
   MAIN_COLOR,
   SURFACE_COLOR,
   HEADER_ICONS_COLOR,
} from '../../constants/colors';
import Gurantee from '../../components/insideAndOutsideGuarantee';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useSelector, useDispatch } from 'react-redux';
import {
   getSpareParts,
   onSelectImagesPressed,
   closeBottomSheet,
   handleCheckItem,
   handlePerview,
   onCommentChange,
} from '../../redux/actions/waitView';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import BackgroundImage from '../../assets/images/app_bg.png';
const ComplainsDetailes = ({ route, navigation }) => {
   const { data } = route.params;
   const isFocused = useIsFocused();
   const dispatch = useDispatch();
   const [userType, setuserType] = useState(null);
   const [galleryModalVisible, setgalleryModalVisible] = useState(false);
   const {
      images,
      guaranteeSpares,
      outGuaranteeSpares,
      comment,
      perviewSpinner,
   } = useSelector(state => ({
      images: state.WaitView.images,
      guaranteeSpares: state.WaitView.inGuaranteeSpares,
      outGuaranteeSpares: state.WaitView.outGuaranteeSpares,
      comment: state.WaitView.comment,
      perviewSpinner: state.WaitView.perviewSpinner,
   }));
   useEffect(() => {
      dispatch(getSpareParts());
      return () => {
         dispatch(closeBottomSheet());
      };
   }, [isFocused]);
   useEffect(() => {
      getUserType();
      return () => {};
   }, []);
   const getUserType = async () => {
      const userType = await AsyncStorage.getItem('userType');
      setuserType(userType);
   };
   console.log('wait vew data', data);
   const toggleGalleryModal = () => {
      setgalleryModalVisible(!galleryModalVisible);
   };
   const handleSelectImage = async type => {
      await toggleGalleryModal();
      dispatch(onSelectImagesPressed(type));
   };
   console.log(images);
   return (
      <KeyboardAvoidingView
         enabled={Platform.OS == 'ios'}
         behavior={'padding'}
         style={{ flex: 1 }}>
         <ImageBackground
            source={BackgroundImage}
            style={styles.container}
            resizeMode="stretch">
            <Header>
               <Icon
                  name={'ios-arrow-back'}
                  type={'ionicon'}
                  color={HEADER_ICONS_COLOR}
                  iconContainerStyle={{ flex: 0.1 }}
                  style={{ transform: [{ rotateY: '-180deg' }] }}
                  onPress={() => navigation.goBack()}
                  size={responsiveFontSize(4)}
               />

               <View
                  style={{
                     flex: 1,
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}>
                  <CustomText
                     text={data.complainNumber}
                     textStyle={{ color: WHITE_COLOR }}
                  />
               </View>
            </Header>

            <View
               style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 10,
               }}>
               <ComplainsItem
                  {...data}
                  onComplainPressed={() => {}}
                  containerStyle={styles.complainsItem}
               />
            </View>

            <View style={{ flex: 1 }}>
               <Gurantee
                  onSelectImagesPressed={toggleGalleryModal}
                  images={images}
                  inGuaranteeSpares={guaranteeSpares}
                  outGuaranteeSpares={outGuaranteeSpares}
                  oncloseBottomSheet={() => dispatch(closeBottomSheet())}
                  onCheckItem={(index, Id, selectedButton) => {
                     dispatch(handleCheckItem(index, Id, selectedButton));
                  }}
                  handlePerview={guranteeStatus =>
                     dispatch(handlePerview(data, guranteeStatus, navigation))
                  }
                  comment={comment}
                  onCommentChange={text => dispatch(onCommentChange(text))}
                  loading={perviewSpinner}
                  userType={userType}
               />
            </View>
            <ImagePickerModal
               toggleModal={toggleGalleryModal}
               isModalVisible={galleryModalVisible}
               onOpenCamerapressed={() => handleSelectImage('camera')}
               onOpenGallerypressed={() => handleSelectImage('gallery')}
            />
         </ImageBackground>
      </KeyboardAvoidingView>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: '100%',
      backgroundColor: SURFACE_COLOR,
      justifyContent: 'space-between',
   },
   complainsItem: {
      width: '100%',
      borderRadius: 0,
      backgroundColor: 'transparent',
   },
});

export default ComplainsDetailes;
