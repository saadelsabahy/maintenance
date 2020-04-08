import { StyleSheet } from 'react-native';
import { MAIN_COLOR, WHITE_COLOR, TEXT_COLOR } from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: MAIN_COLOR,
   },
   imageContainer: {
      width: '80%',
      height: '30%',
      justifyContent: 'center',
      alignItems: 'flex-end',
      alignSelf: 'center',
   },
   headerImage: {
      width: '40%',
      height: '50%',
      resizeMode: 'contain',
   },
   formContainer: {
      flex: 1,
      justifyContent: 'center',
      borderRadius: 20,
   },
   svg: {
      position: 'absolute',
      transform: [
         {
            rotate: '-120deg',
         },
      ],
   },
   loginText: {
      color: TEXT_COLOR,
      fontSize: 22,
      fontFamily: 'DroidArabicKufi',
      alignSelf: 'flex-start',
   },
   logoText: {
      width: '40%',
      textAlign: 'center',
      fontSize: responsiveFontSize(2.2),
      color: WHITE_COLOR,
   },
});

export default styles;
