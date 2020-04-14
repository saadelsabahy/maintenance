import { combineReducers } from 'redux';

import Auth from './Auth';
import Complains from './ComplainsList';
import WaitView from './WaitView';

export default combineReducers({
   Auth,
   Complains,
   WaitView,
});
