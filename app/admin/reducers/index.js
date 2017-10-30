import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import placeholder from './placeholder';

export default combineReducers({
  placeholder,
  routing: routerReducer,
});
