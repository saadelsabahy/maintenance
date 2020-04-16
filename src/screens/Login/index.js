import React, { useRef, useState } from 'react';
import {
   View,
   Image,
   ScrollView,
   Keyboard,
   KeyboardAvoidingView,
   Platform,
} from 'react-native';
import { CustomInput, CustomButton, CustomText } from '../../components';
import Svg, { Rect, G } from 'react-native-svg';
import LoginHeaderImage from '../../assets/images/gear.png';
import {
   MAIN_COLOR,
   WHITE_COLOR,
   TEXT_COLOR,
   SECONDART_COLOR,
} from '../../constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import {
   inputsChange,
   onLoginPressed,
} from '../../redux/actions/Auth/AuthActions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import styles from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const Login = ({ navigation }) => {
   const passwordInput = useRef();
   const keyboardAvoidingRef = useRef();
   const [keyBoardShow, setkeyBoardShow] = useState(false);
   const dispatch = useDispatch();
   const { userName, userPassword, loginSpinner, loginError } = useSelector(
      state => ({
         userName: state.Auth.userName,
         userPassword: state.Auth.userPassword,
         loginSpinner: state.Auth.loginSpinner,
         loginError: state.Auth.loginError,
      })
   );
   const onKeyboardShow = () => {
      setkeyBoardShow(true);
      // keyboardAvoidingRef.current.scrollToPosition({ x: 0, y: 500, animated: true })
   };
   const onKeyboardHide = () => {
      setkeyBoardShow(false);
      // keyboardAvoidingRef.current.scrollToPosition({ x: 0, y: 0, animated: true })
   };
   return (
      <KeyboardAwareScrollView
         style={styles.container}
         enableOnAndroid={true}
         scrollEnabled={keyBoardShow}
         onKeyboardDidShow={onKeyboardShow}
         onKeyboardDidHide={onKeyboardHide}
         ref={ref => (ref = keyboardAvoidingRef)}
         keyboardShouldPersistTaps="always">
         <View style={styles.imageContainer}>
            <Image source={LoginHeaderImage} style={styles.headerImage} />
            <CustomText text="تطبيق الصيانات" textStyle={styles.logoText} />
         </View>

         <View style={styles.formContainer}>
            <Svg width="125%" height="110%" style={styles.svg}>
               <Rect
                  x="0"
                  y="0"
                  rx="70"
                  ry="70"
                  width="100%"
                  height="100%"
                  fill={SECONDART_COLOR}
               />
            </Svg>
            <View style={styles.textContainer}>
               <CustomText text={'تسجيل الدخول'} textStyle={styles.loginText} />
            </View>
            <View
               style={{
                  flex: 0.4,
                  width: '85%',
                  justifyContent: 'space-evenly',
                  alignSelf: 'center',
               }}>
               <CustomInput
                  iconStartName={'account-outline'}
                  iconType={'material-community'}
                  iconStartBackGround
                  placeholderTextColor={TEXT_COLOR}
                  iconStartSize={responsiveFontSize(2.5)}
                  startIconColor={MAIN_COLOR}
                  placeholder={'اسم المستخدم'}
                  onChangeText={loginName => {
                     dispatch(inputsChange('loginName', loginName));
                  }}
                  value={userName}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInput.current.focus()}
                  blurOnSubmit={false}

                  /*  error={true}
            errorText={'حدث خطا مابيياريالاتا'} */
               />

               <CustomInput
                  iconType={'feather'}
                  iconStartName="lock"
                  iconStartBackGround
                  placeholderTextColor={TEXT_COLOR}
                  iconStartSize={responsiveFontSize(2.5)}
                  startIconColor={MAIN_COLOR}
                  placeholder={'كلمه المرور'}
                  secureTextEntry={true}
                  onChangeText={loginPassword => {
                     dispatch(inputsChange('loginPassword', loginPassword));
                  }}
                  value={userPassword}
                  referance={passwordInput}
                  returnKeyType="go"
                  iconStartStyle={styles.icon}
               />
            </View>

            <View style={styles.buttonContainer}>
               <CustomButton
                  buttonTitle="دخول"
                  onButtonPressed={() => {
                     dispatch(onLoginPressed());
                     Keyboard.dismiss();
                  }}
                  buttonContainerStyle={
                     !loginSpinner
                        ? styles.button
                        : { ...styles.button, justifyContent: 'center' }
                  }
                  icon={'long-arrow-right'}
                  iconColor={WHITE_COLOR}
                  iconType={'font-awesome'}
                  loading={loginSpinner}
                  spinnerColor={WHITE_COLOR}
               />
            </View>
         </View>
      </KeyboardAwareScrollView>
   );
};

export default Login;
