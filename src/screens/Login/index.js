import React, { useRef } from 'react';
import {
   View,
   Text,
   StyleSheet,
   Image,
   ScrollView,
   Keyboard,
} from 'react-native';
import { CustomInput, CustomButton, CustomText } from '../../components';
import Svg, { Rect, G } from 'react-native-svg';
import LoginHeaderImage from '../../assets/images/login_header.png';
import {
   MAIN_COLOR,
   WHITE_COLOR,
   TEXT_COLOR,
   SECONDART_COLOR,
} from '../../constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import { inputsChange } from '../../redux/actions/Auth/AuthActions';
const Login = () => {
   const passwordInput = useRef(null);
   const dispatch = useDispatch();
   const { name, password } = useSelector(state => ({
      name: state.Auth.loginUserName,
      password: state.Auth.loginUserPassword,
   }));

   return (
      <View style={styles.container}>
         <View style={styles.imageContainer}>
            <Image source={LoginHeaderImage} style={styles.headerImage} />
         </View>

         <View style={styles.formContainer}>
            <Svg width="100%" height="100%" style={styles.svg}>
               <G rotation="10">
                  <Rect
                     x="0"
                     y="0"
                     width="100%"
                     height="100%"
                     fill={SECONDART_COLOR}
                     strokeWidth="3"
                  />
               </G>
            </Svg>
            <ScrollView
               style={{ flex: 1 }}
               contentContainerStyle={{
                  flexGrow: 1,
                  width: '80%',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
               }}
               keyboardShouldPersistTaps="always"
               keyboardDismissMode="on-drag">
               <CustomText text={'تسجيل الدخول'} textStyle={styles.loginText} />
               <View
                  style={{
                     width: '100%',
                     justifyContent: 'center',
                     marginVertical: 15,
                  }}>
                  <CustomInput
                     iconStartName={'account-outline'}
                     iconType={'material-community'}
                     iconStartBackGround
                     placeholderTextColor={TEXT_COLOR}
                     iconStartSize={30}
                     startIconColor={MAIN_COLOR}
                     placeholder={'اسم المستخدم'}
                     inputProps={{
                        onChangeText: loginName => {
                           dispatch(inputsChange('loginName', loginName));
                        },
                        value: name,
                        returnKeyType: 'next',
                        onSubmitEditing: () => passwordInput.current.focus(),
                        blurOnSubmit: false,
                     }}
                     /*  error={true}
                  errorText={'حدث خطا مابيياريالاتا'} */
                  />

                  <CustomInput
                     iconType={'feather'}
                     iconStartName="lock"
                     iconStartBackGround
                     placeholderTextColor={TEXT_COLOR}
                     iconStartSize={30}
                     startIconColor={MAIN_COLOR}
                     placeholder={'كلمه المرور'}
                     inputProps={{
                        secureTextEntry: true,
                        onChangeText: loginPassword => {
                           dispatch(
                              inputsChange('loginPassword', loginPassword)
                           );
                        },
                        value: password,
                        ref: passwordInput,
                        returnKeyType: 'go',
                     }}
                     iconStartStyle={styles.icon}
                  />
               </View>
               <CustomButton
                  buttonTitle="دخول"
                  onButtonPressed={() => {
                     Keyboard.dismiss();
                  }}
                  buttonContainerStyle={{
                     width: '50%',
                     alignSelf: 'flex-start',
                     justifyContent: 'space-between',
                  }}
                  icon={'arrow-right'}
                  iconColor={WHITE_COLOR}
                  iconType={'material-community'}
               />
            </ScrollView>
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: MAIN_COLOR,
   },
   imageContainer: {
      width: '80%',
      height: '30%',
      alignItems: 'flex-end',
      alignSelf: 'center',
   },
   headerImage: { width: '40%', height: '100%', resizeMode: 'contain' },
   formContainer: {
      flex: 1,
      borderRadius: 30,
      justifyContent: 'center',
   },
   svg: { position: 'absolute' /* transform: [{ rotate: '-120deg' }] */ },
   loginText: {
      color: TEXT_COLOR,
      fontSize: 22,
      fontFamily: 'DroidArabicKufi',
      alignSelf: 'flex-start',
   },
});

export default Login;
