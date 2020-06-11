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
} from './src/constants/colors';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { YellowBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import AppNavigation from './src/navigation/MainNavigator';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

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
            <>
               <SafeAreaView style={{ flex: 0, backgroundColor: MAIN_COLOR }} />
               <SafeAreaView style={styles.container}>
                  <StatusBar backgroundColor={MAIN_COLOR} animated />

                  <AppNavigation /* screenProps={{ database }} */ />
                  <FlashMessage
                     position="bottom"
                     style={styles.flashMessage}
                     duration={3000}
                     textStyle={styles.flashText}
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
   flashMessage: {},
   flashText: {
      fontFamily: 'DroidArabicKufi',
      textTransform: 'capitalize',
      fontSize: responsiveFontSize(1.5),
      alignSelf: 'center',
   },
});

export default App;
