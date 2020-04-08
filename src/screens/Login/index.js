import React, { useRef } from 'react';
import { View, Image, ScrollView, Keyboard } from 'react-native';
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
import { inputsChange } from '../../redux/actions/Auth/AuthActions';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import styles from './style';
const Login = ({ navigation }) => {
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
            <CustomText text="تطبيق الصيانات" textStyle={styles.logoText} />
         </View>

         <View style={styles.formContainer}>
            <Svg width="100%" height="100%" style={styles.svg}>
               <Rect
                  x="0"
                  y="2%"
                  width="100%"
                  height="100%"
                  fill={SECONDART_COLOR}
               />
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
                     iconStartSize={responsiveFontSize(2.5)}
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
                     iconStartSize={responsiveFontSize(2.5)}
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
                     marginBottom: 5,
                  }}
                  icon={'long-arrow-right'}
                  iconColor={WHITE_COLOR}
                  iconType={'font-awesome'}
               />
            </ScrollView>
         </View>
      </View>
   );
};

export default Login;
