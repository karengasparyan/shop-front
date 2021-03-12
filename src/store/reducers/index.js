import { combineReducers } from 'redux';
import sign from './sign';
import products from './products';

export default combineReducers({
  sign,
  products,
});
