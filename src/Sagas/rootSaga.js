import { all } from 'redux-saga/effects';
import {albumSaga} from './albumSaga';
import { photoSaga } from './photoSaga';
import todoSaga from './TodoSaga';

export default function* rootSaga() {
  yield all([
    todoSaga(),
    albumSaga(),
    photoSaga()
  ]);
}
