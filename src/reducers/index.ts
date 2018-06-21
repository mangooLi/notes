import list from './list';
import * as data from './data';
import ui from './ui';
import { combineReducers } from 'redux';

export default combineReducers({
  ...data,
  list,
  ui,
});
