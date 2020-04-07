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
import { CustomImage, Triangle, Header, CustomSwiper, CustomMap, OrderTrackCard } from './src/components';
import MainNavigator from './src/navigation/MainNavigator';

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
<<<<<<< HEAD
            <Login />
            {/* <DrawerItemsList /> */}
            {/*  <CustomImage
               imageSource={
                  'https://www.whittierfirstday.org/wp-content/uploads/default-user-image-e1501670968910.png'
               }
            /> */}
            {/*  <Triangle />
            <Header
               iconEnd={'account'}
               iconEndType={'material-community'}
               iconStart={'heart'}
               iconStartType={'material-community'}
            /> */}
            {/* <CustomSwiper /> */}
            {/*  <CustomMap />
            <OrderTrackCard /> */}
         </SafeAreaView>
=======
            <MainNavigator />
         </View>
>>>>>>> 6b552287323637288e0c3d76ccec54e4076453bc
      </Provider>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

export default App;
