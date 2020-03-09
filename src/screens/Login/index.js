import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { CustomInput, CustomButton, CustomText } from '../../components';
import LoginHeaderImage from '../../assets/images/login_header.png';
import { MAIN_COLOR, WHITE_COLOR } from '../../constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import { inputsChange } from '../../redux/actions/Auth/AuthActions';
const Login = () => {
   const dispatch = useDispatch();
   const { name, password } = useSelector(state => ({
      name: state.Auth.loginUserName,
      password: state.Auth.loginUserPassword,
   }));

   return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
         <View style={styles.container}>
            <View style={styles.imageContainer}>
               <Image source={LoginHeaderImage} style={styles.headerImage} />
            </View>

            <View style={styles.formContainer}>
               <CustomText text={'تسجيل الدخول'} textStyle={styles.loginText} />
               <CustomInput
                  iconType={'material-community'}
                  iconStartName={'account-outline'}
                  iconStartSize={30}
                  startIconColor={WHITE_COLOR}
                  placeholder={'اسم المستخدم'}
                  inputProps={{
                     onChangeText: loginName => {
                        dispatch(inputsChange('loginName', loginName));
                     },
                     value: name,
                  }}
                  /*  error={true}
                  errorText={'حدث خطا مابيياريالاتا'} */
               />

               <CustomInput
                  iconType={'feather'}
                  iconStartName="lock"
                  iconStartSize={30}
                  startIconColor={WHITE_COLOR}
                  placeholder={'كلمه المرور'}
                  inputProps={{
                     secureTextEntry: true,
                     onChangeText: loginPassword => {
                        dispatch(inputsChange('loginPassword', loginPassword));
                     },
                     value: password,
                  }}
                  iconStartStyle={styles.icon}
               />
               <CustomButton buttonTitle="دخول" />
            </View>
         </View>
      </ScrollView>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: WHITE_COLOR,
   },
   imageContainer: { width: '100%', height: '40%' },
   headerImage: { width: '100%', height: '100%', resizeMode: 'cover' },
   formContainer: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   loginText: {
      color: MAIN_COLOR,
      fontSize: 22,
      fontFamily: 'DroidArabicKufi',
      marginVertical: 20,
   },
});

export default Login;
