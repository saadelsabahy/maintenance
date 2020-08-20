/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, NativeModules} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import database from './src/models';
import {PushNotificationConfigration} from './src/utils/PushNotificationConfig';
import {handleRecieveNotification} from './src/redux/actions/notifications';
import moment from 'moment';
import 'moment/locale/ar';

moment.locale('ar');
PushNotificationConfigration();
handleRecieveNotification();
/* 
import AppNavigation from './src/navigation/MainNavigator';
const Navigation = AppNavigation({ database }); */
AppRegistry.registerComponent(appName, () => App);
