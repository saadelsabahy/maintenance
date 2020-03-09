import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import Reactotron from '../../ReactotronConfig';

const store = createStore(
   reducer,
   {},
   compose(applyMiddleware(thunk), Reactotron.createEnhancer())
);
export default store;
