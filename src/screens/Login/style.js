import { StyleSheet } from 'react-native';
import {
   MAIN_COLOR,
   WHITE_COLOR,
   TEXT_COLOR,
   SCREEN_WIDTH,
   SCREEN_HEIGHT,
} from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: MAIN_COLOR,
   },
   imageContainer: {
      width: SCREEN_WIDTH - 30,
      height: SCREEN_HEIGHT * 0.3,
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
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT * 0.7,
      justifyContent: 'center',
   },
   svg: {
      position: 'absolute',
      transform: [
         {
            rotate: '-30deg',
         },
         { translateX: 50 },
         { translateY: 120 },
      ],
   },
   loginText: {
      color: TEXT_COLOR,
      fontSize: responsiveFontSize(2.5),
      fontFamily: 'DroidArabicKufi',
      alignSelf: 'flex-start',
   },
   logoText: {
      textAlign: 'center',
      fontSize: responsiveFontSize(2.2),
      color: WHITE_COLOR,
   },
   textContainer: {
      width: '90%',
      height: '10%',
      justifyContent: 'center',
      alignSelf: 'center',
   },
   buttonContainer: {
      width: '90%',
      height: '10%',
      justifyContent: 'center',
      alignSelf: 'center',
   },
   button: {
      width: '45%',
      alignSelf: 'flex-start',
      justifyContent: 'space-between',
      borderRadius: Math.round(SCREEN_HEIGHT / 2 + SCREEN_WIDTH / 2),
      height: SCREEN_HEIGHT / 15,
   },
});

export default styles;
