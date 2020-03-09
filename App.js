import React, { useEffect } from 'react';
import { View, Text, StyleSheet, I18nManager, StatusBar } from 'react-native';
import { MAIN_COLOR } from './src/constants/colors';
import Login from './src/screens/Login';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { YellowBox } from 'react-native';
import DrawerItemsList from './src/components/DrawerItemsList';
import { CustomImage } from './src/components';
YellowBox.ignoreWarnings(['Remote debugger']);
const App = () => {
   useEffect(() => {
      I18nManager.forceRTL(true);
      return () => {};
   }, []);
   return (
      <Provider store={store}>
         <View style={styles.container}>
            <StatusBar backgroundColor={MAIN_COLOR} />
            {/* <Login /> */}
            {/* <DrawerItemsList /> */}
            <CustomImage
               imageSource={
                  'https://www.whittierfirstday.org/wp-content/uploads/default-user-image-e1501670968910.png'
               }
            />
         </View>
      </Provider>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
});

export default App;
