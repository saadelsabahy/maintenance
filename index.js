/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
/* import database from './src/models';
import AppNavigation from './src/navigation/MainNavigator';
const Navigation = AppNavigation({ database }); */
AppRegistry.registerComponent(appName, () => App);
