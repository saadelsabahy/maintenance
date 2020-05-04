import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   I18nManager,
   StatusBar,
   Platform,
} from 'react-native';
import { MAIN_COLOR, WHITE_COLOR } from './src/constants/colors';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { YellowBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import AppNavigation from './src/navigation/MainNavigator';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
YellowBox.ignoreWarnings(['Remote debugger']);
// import database from './src/models';
const App = () => {
   I18nManager.forceRTL(true);
   I18nManager.allowRTL(true);
   useEffect(() => {
      return () => {};
   }, []);

   return (
      <Provider store={store}>
         <PersistGate persistor={persistor} loading={null}>
            <SafeAreaProvider>
               <SafeAreaView style={styles.container}>
                  <StatusBar backgroundColor={MAIN_COLOR} animated />

                  <AppNavigation /* screenProps={{ database }} */ />
                  <FlashMessage
                     position="bottom"
                     style={styles.flashMessage}
                     duration={4000}
                     textStyle={styles.flashText}
                     titleStyle={styles.flashText}
                  />
               </SafeAreaView>
            </SafeAreaProvider>
         </PersistGate>
      </Provider>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: MAIN_COLOR,
      paddingBottom: 0,
   },
   flashMessage: {},
   flashText: {
      fontFamily: 'DroidArabicKufi',
      textTransform: 'capitalize',
      fontSize: responsiveFontSize(1.5),
      alignSelf: 'center',
   },
});

export default App;
