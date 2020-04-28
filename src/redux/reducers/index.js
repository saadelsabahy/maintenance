import { combineReducers } from 'redux';

import Auth from './Auth';
import Complains from './ComplainsList';
import WaitView from './WaitView';
import Dashboard from './Dashboard';
import UpdateComplainsStatus from './complainStatus';

export default combineReducers({
   Auth,
   Complains,
   WaitView,
   Dashboard,
   UpdateComplainsStatus,
});
