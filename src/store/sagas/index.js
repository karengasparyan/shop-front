import { fork, all } from 'redux-saga/effects';
import sign from './sign';
import products from './products';


export default function* watchers() {
  yield all([
    sign,
    products,
  ].map(fork));
}
