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
      backgroundColor: '#000',
      paddingBottom: 0,
      marginBottom: 0,
      height: SCREEN_HEIGHT,
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
      height: '45%',
      resizeMode: 'contain',
   },
   formContainer: {
      width: '90%',
      height: SCREEN_HEIGHT,
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
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
      justifyContent: 'center',
      alignSelf: 'center',
   },
   buttonContainer: {
      width: SCREEN_WIDTH / 2,
      height: SCREEN_HEIGHT / 15,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      start: '40%',
   },
   button: {
      width: '100%',
      height: '100%',
      borderRadius: 0,
   },
});

export default styles;
