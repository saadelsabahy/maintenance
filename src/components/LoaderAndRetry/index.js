import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { MAIN_COLOR } from '../../constants/colors';
import { CustomText } from '../customText';
import { Icon } from '../Icon';

const LoaderAndRetry = ({
   loading,
   error,
   onRetryPressed,
   loadingText,
   errorText,
}) => {
   return (
      <View style={styles.container}>
         {loading && (
            <View style={styles.contentContainer}>
               <ActivityIndicator size="large" color={MAIN_COLOR} />
               <CustomText text={loadingText || 'جاري تحميل البيانات'} />
            </View>
         )}
         {error && (
            <View style={styles.contentContainer}>
               <Icon
                  name="reload"
                  onPress={onRetryPressed}
                  size={responsiveFontSize(4)}
                  type={'material-community'}
                  color={MAIN_COLOR}
                  size={responsiveFontSize(4)}
               />
               <CustomText
                  text={errorText || 'حدث خطأ ما برجاء اعاده المحاوله'}
               />
            </View>
         )}
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
   },
   contentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
});

export { LoaderAndRetry };
