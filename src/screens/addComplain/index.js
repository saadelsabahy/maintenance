import React, { useRef, useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import {
   CustomText,
   Header,
   Icon,
   CustomInput,
   ImageSelector,
   CustomButton,
   CustomDropDown,
   MaterialDropDown,
   ImagePickerModal,
} from '../../components';
import BackgroundImage from '../../assets/images/bgetention.png';
import {
   SURFACE_COLOR,
   HEADER_ICONS_COLOR,
   SCREEN_HEIGHT,
   WHITE_COLOR,
   SCREEN_WIDTH,
} from '../../constants/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextArea from '../../components/TextArea';
import { useForm, Controller } from 'react-hook-form';
import validation from '../../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import {
   handleOpenCamerapressed,
   handleOpenGallerypressed,
   resetAddcomplainPhotos,
   onAddComplainPressed,
} from '../../redux/actions';
import { useIsFocused } from '@react-navigation/native';
let vehiclesTypes = [
   {
      value: 'ضاغط',
   },
   {
      value: 'حاويه',
   },
   {
      value: 'مكنسه',
   },
   {
      value: 'مكنه شطف اليه',
   },
];
let contractorsNumbers = [
   {
      value: '80',
   },
   {
      value: '81',
   },
];
const AddComplain = ({ navigation }) => {
   const isFocused = useIsFocused();
   const vehiclesTypesRef = useRef(null);
   const contractorsRef = useRef(null);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const dispatch = useDispatch();
   const { images, loading } = useSelector(state => ({
      images: state.AddComplain.images,
      loading: state.AddComplain.loading,
   }));
   const defaultValues = {
      plateNumber: '',
      vehicleNumber: '',
      vehicleType: '',
      complainDescription: '',
      contractor: '',
   };
   const {
      register,
      setValue,
      handleSubmit,
      errors,
      reset,
      setError,
      control,
   } = useForm({
      mode: 'all',
      reValidateMode: 'all',
      defaultValues,
      resolver: undefined,
      context: undefined,
      criteriaMode: 'firstErrorDetected',
      shouldFocusError: true,
      shouldUnregister: true,
   });
   useEffect(() => {
      return () => {
         dispatch(resetAddcomplainPhotos());
         reset();
         vehiclesTypesRef.current.state.value = '';
         contractorsRef.current.state.value = '';
      };
   }, [isFocused]);
   const onSubmit = data => {
      dispatch(onAddComplainPressed(data));
      /*  const res = alert(JSON.stringify(data));
      reset(res); //to reset after finish request */
   };
   const toggleModal = () => setIsModalVisible(!isModalVisible);
   const onOpenCamerapressed = async () => {
      await toggleModal();
      dispatch(handleOpenCamerapressed());
   };
   const onOpenGallerypressed = async () => {
      await toggleModal();
      dispatch(handleOpenGallerypressed());
   };
   console.log(loading);
   return (
      <ImageBackground
         source={BackgroundImage}
         style={styles.container}
         resizeMode="stretch">
         <Header>
            <Icon
               name={'ios-arrow-back'}
               type={'ionicon'}
               color={HEADER_ICONS_COLOR}
               iconContainerStyle={{ flex: 0.1, alignItems: 'flex-start' }}
               style={{ transform: [{ rotateY: '-180deg' }] }}
               onPress={() => navigation.goBack()}
            />

            <View style={styles.headerTextContainer}>
               <CustomText text="اضافه بلاغ" />
            </View>
         </Header>

         <KeyboardAwareScrollView
            style={styles.formContainer}
            enableOnAndroid={true}
            contentContainerStyle={styles.keyboardAwareContent}
            extraScrollHeight={30}>
            <ImagePickerModal
               toggleModal={toggleModal}
               isModalVisible={isModalVisible}
               onOpenCamerapressed={onOpenCamerapressed}
               onOpenGallerypressed={onOpenGallerypressed}
            />
            <View style={styles.inputsWrapper}>
               <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                     <CustomInput
                        inputContainerStyle={styles.input}
                        placeholder={'رقم اللوحه'}
                        error={errors.plateNumber}
                        onChangeText={value => onChange(value)}
                        onBlur={onBlur}
                        value={value}
                        //  onChangeText={text => setValue('plateNumber', text, true)}
                     />
                  )}
                  name="plateNumber"
                  rules={validation['plateNumber']}
               />
               <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                     <CustomInput
                        inputContainerStyle={styles.input}
                        placeholder={'رقم المعده'}
                        onBlur={onBlur}
                        value={value}
                        error={errors.vehicleNumber}
                        onChangeText={value => onChange(value)}
                     />
                  )}
                  name="vehicleNumber"
                  rules={validation['vehicleNumber']}
               />

               <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                     <MaterialDropDown
                        data={vehiclesTypes}
                        label={'نوع المعده '}
                        onBlur={onBlur}
                        value={value}
                        error={errors.vehicleType}
                        onChangeText={(value, index, data) => onChange(value)}
                        referance={c => (vehiclesTypesRef.current = c)}
                     />
                  )}
                  rules={validation['vehicleType']}
                  name="vehicleType"
               />

               <Controller
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                     <MaterialDropDown
                        data={contractorsNumbers}
                        label={'العقد'}
                        onBlur={onBlur}
                        value={value}
                        error={errors.contractor}
                        onChangeText={(value, index, data) => onChange(value)}
                        referance={c => (contractorsRef.current = c)}
                     />
                  )}
                  name="contractor"
                  rules={validation['contractor']}
               />

               <Controller
                  control={control}
                  render={({ onChange, onBlur, value, onFocus }) => (
                     <TextArea
                        containerStyle={styles.textAreaContainer}
                        placeholder="وصف البلاغ"
                        error={errors.complainDescription}
                        onBlur={onBlur}
                        value={value}
                        onChangeText={value => onChange(value)}
                        onFocus={onFocus}
                     />
                  )}
                  name="complainDescription"
                  rules={validation['complainDescription']}
               />

               <ImageSelector
                  containerStyle={styles.imageSelectorContainer}
                  images={images}
                  onSelectImagesPressed={toggleModal}
               />

               <CustomButton
                  buttonContainerStyle={styles.buttonContainer}
                  buttonTitle="إضافه"
                  onButtonPressed={handleSubmit(onSubmit)}
                  loading={loading}
                  spinnerColor={WHITE_COLOR}
               />
            </View>
         </KeyboardAwareScrollView>
      </ImageBackground>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: SURFACE_COLOR,
   },
   headerTextContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   formContainer: {
      flex: 1,
   },
   keyboardAwareContent: {
      flexGrow: 1,
      justifyContent: 'center',
   },
   inputsWrapper: {
      flexGrow: 1,
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'space-evenly',
      paddingVertical: 10,
   },
   textAreaContainer: {
      height: SCREEN_HEIGHT / 5,
      width: '100%',
      marginVertical: 10,
   },
   buttonContainer: {
      alignSelf: 'center',
      width: '100%',
      borderRadius: 10,
      height: SCREEN_HEIGHT / 15,
   },
   input: {
      backgroundColor: SURFACE_COLOR,
      borderRadius: 10,
      paddingHorizontal: 5,
      marginVertical: 0,
   },
   imageSelectorContainer: {
      marginVertical: 10,
      width: '100%',
   },
});

export default AddComplain;
