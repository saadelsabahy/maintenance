if (__DEV__) {
   import('./ReactotronConfig').then(() =>
      console.log('Reactotron Configured')
   );
}
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   I18nManager,
   StatusBar,
   Platform,
   SafeAreaView,
} from 'react-native';
import {
   MAIN_COLOR,
   WHITE_COLOR,
   SECONDART_COLOR,
   SURFACE_COLOR,
   SCREEN_HEIGHT,
} from './src/constants/colors';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { YellowBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import AppNavigation from './src/navigation/MainNavigator';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

YellowBox.ignoreWarnings(['Remote debugger']);
// import database from './src/models';
const App = () => {
   I18nManager.forceRTL(true);
   I18nManager.allowRTL(true);
   const [initialRoute, setinitialRoute] = useState('');

   return (
      <Provider store={store}>
         <PersistGate persistor={persistor} loading={null}>
            <>
               <StatusBar
                  backgroundColor={SURFACE_COLOR}
                  animated
                  barStyle="light-content"
               />
               <SafeAreaView style={styles.container}>
                  <AppNavigation initialRouteName={initialRoute} />
                  <FlashMessage
                     position="bottom"
                     style={styles.flashMessage}
                     duration={3000}
                     titleStyle={styles.flashText}
                  />
               </SafeAreaView>
            </>
         </PersistGate>
      </Provider>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: SURFACE_COLOR,
   },
   flashMessage: {
      minHeight: 0,
      justifyContent: 'center',
      marginTop: 0,
   },
   flashText: {
      fontFamily: 'DroidArabicKufi',
      fontSize: responsiveFontSize(1.5),
      textTransform: 'capitalize',
      marginBottom: 0,
      lineHeight: responsiveFontSize(2),
      alignSelf: 'center',
   },
});

export default App;
