import React, { useRef, useState } from 'react';
import {
   View,
   Image,
   ScrollView,
   Keyboard,
   KeyboardAvoidingView,
   Platform,
   ImageBackground,
   Text,
} from 'react-native';
import {
   CustomInput,
   CustomButton,
   CustomText,
   LoginButton,
} from '../../components';
import LoginHeaderImage from '../../assets/images/gear.png';
import {
   MAIN_COLOR,
   WHITE_COLOR,
   TEXT_COLOR,
   SECONDART_COLOR,
   SCREEN_HEIGHT,
   SCREEN_WIDTH,
   MAIN_RED_COLOR,
   PLACEHOLDER_COLOR,
   SURFACE_COLOR,
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
      <View style={{ flex: 1 }}>
         <KeyboardAwareScrollView
            style={styles.container}
            enableOnAndroid={true}
            scrollEnabled={keyBoardShow}
            onKeyboardDidShow={onKeyboardShow}
            onKeyboardDidHide={onKeyboardHide}
            scrollEventThrottle={10}
            extraHeight={0}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{ flexGrow: 1 }}
            ref={ref => (ref = keyboardAvoidingRef)}
            keyboardShouldPersistTaps="never">
            <View
               style={{
                  flex: 1,
                  backgroundColor: MAIN_COLOR,
                  justifyContent: 'space-between',
               }}>
               <View
                  style={{
                     height: SCREEN_HEIGHT / 3,
                  }}>
                  <Image
                     source={require('../../assets/images/login_bg_top.png')}
                     style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                     }}
                     resizeMode="stretch"
                  />
                  <View
                     style={{
                        position: 'absolute',
                        start: '50%',
                        bottom: SCREEN_HEIGHT > 850 ? 30 : 25,
                     }}>
                     <CustomText
                        text={'تطبيق الصيانات'}
                        textStyle={styles.loginText}
                     />
                  </View>
               </View>
               <View
                  style={{
                     height: SCREEN_HEIGHT / 3,
                     backgroundColor: SURFACE_COLOR,
                     justifyContent: 'space-evenly',
                  }}>
                  <View style={styles.textContainer}>
                     <CustomText
                        text={'تسجيل الدخول'}
                        textStyle={styles.loginText}
                     />
                  </View>
                  <View style={{ width: '80%', alignSelf: 'center' }}>
                     <CustomInput
                        iconStartName={'account-outline'}
                        iconType={'material-community'}
                        iconStartBackGround
                        placeholderTextColor={PLACEHOLDER_COLOR}
                        iconStartSize={responsiveFontSize(3.5)}
                        startIconColor={MAIN_RED_COLOR}
                        placeholder={'اسم المستخدم'}
                        onChangeText={loginName => {
                           dispatch(inputsChange('loginName', loginName));
                        }}
                        value={userName}
                        returnKeyType="next"
                        onSubmitEditing={() => passwordInput.current.focus()}
                        blurOnSubmit={false}
                        inputContainerStyle={styles.inputContainer}
                     />

                     <CustomInput
                        iconType={'feather'}
                        iconStartName="lock"
                        iconStartBackGround
                        placeholderTextColor={PLACEHOLDER_COLOR}
                        iconStartSize={responsiveFontSize(3.5)}
                        startIconColor={MAIN_RED_COLOR}
                        placeholder={'كلمه المرور'}
                        secureTextEntry={true}
                        onChangeText={loginPassword => {
                           dispatch(
                              inputsChange('loginPassword', loginPassword)
                           );
                        }}
                        value={userPassword}
                        referance={passwordInput}
                        returnKeyType="go"
                        iconStartStyle={styles.icon}
                        inputContainerStyle={styles.inputContainer}
                     />
                  </View>
               </View>
               <View
                  style={{
                     height: SCREEN_HEIGHT / 3,
                     paddingVertical: SCREEN_HEIGHT > 850 ? 30 : 10,
                     backgroundColor: SURFACE_COLOR,
                  }}>
                  <Image
                     source={require('../../assets/images/login_bg_btm.png')}
                     style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                     }}
                     resizeMode="stretch"
                  />
                  <View style={styles.buttonContainer}>
                     <LoginButton
                        onLoginPressed={() => {
                           dispatch(onLoginPressed());
                        }}
                        loading={loginSpinner}
                     />
                  </View>
               </View>
            </View>
         </KeyboardAwareScrollView>
      </View>
   );
};

export default Login;
