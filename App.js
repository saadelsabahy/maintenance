import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
   View,
   Text,
   StyleSheet,
   I18nManager,
   StatusBar,
   SafeAreaView,
} from 'react-native';
import { MAIN_COLOR } from './src/constants/colors';
import Login from './src/screens/Login';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { YellowBox } from 'react-native';
import DrawerItemsList from './src/components/DrawerItemsList';
import {
   CustomImage,
   Triangle,
   Header,
   CustomSwiper,
   CustomMap,
   OrderTrackCard,
} from './src/components';
import DashBoard from './src/screens/Dashboard';
import AppNavigation from './src/navigation/MainNavigator';

YellowBox.ignoreWarnings(['Remote debugger']);

const App = () => {
   I18nManager.forceRTL(true);
   useEffect(() => {
      return () => {};
   }, []);

   return (
      <Provider store={store}>
         <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={MAIN_COLOR} />
            <AppNavigation />
            {/*  <Login /> */}
            {/*  <DashBoard />*/}
         </SafeAreaView>
      </Provider>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: MAIN_COLOR,
   },
});

export default App;
