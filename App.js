import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   I18nManager,
   StatusBar,
   SafeAreaView,
} from 'react-native';
import { MAIN_COLOR, WHITE_COLOR } from './src/constants/colors';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { YellowBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import AppNavigation from './src/navigation/MainNavigator';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
YellowBox.ignoreWarnings(['Remote debugger']);

const App = () => {
   I18nManager.forceRTL(true);
   useEffect(() => {
      return () => {};
   }, []);

   return (
      <Provider store={store}>
         <PersistGate persistor={persistor} loading={null}>
            <SafeAreaView style={styles.container}>
               <StatusBar backgroundColor={MAIN_COLOR} />

               <AppNavigation />
               <FlashMessage
                  position="bottom"
                  style={styles.flashMessage}
                  duration={2500}
                  textStyle={styles.flashText}
                  titleStyle={styles.flashText}
               />
            </SafeAreaView>
         </PersistGate>
      </Provider>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: MAIN_COLOR,
   },
   flashMessage: {
      width: '100%',
      height: '5%',
      alignSelf: 'center',
      justifyContent: 'center',
   },
   flashText: {
      fontFamily: 'DroidArabicKufi',
      textTransform: 'capitalize',
      fontSize: responsiveFontSize(1.8),
   },
});

export default App;
