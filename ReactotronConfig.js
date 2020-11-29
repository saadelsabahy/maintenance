import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-community/async-storage';

const reactotron = Reactotron.configure({
  host: '192.168.50.150',
  name: 'maintenance',
})
  .useReactNative()
  .setAsyncStorageHandler(AsyncStorage)
  .use(reactotronRedux())
  .connect();

export default reactotron;
