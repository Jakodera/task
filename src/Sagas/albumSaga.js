import axios from 'axios';
import {
  call,
  put,
  takeLatest
} from 'redux-saga/effects';
import * as actionTypes from '../Store/Actions/actionTypes';
import { albumsFetchSucceded, albumsFetchFailed } from '../Store/Actions/homeActions';

function fetchDataAlbums() {
  return axios.get('https://jsonplaceholder.typicode.com/albums?_limit=10')
    .then((response) => {
      console.log('in axios');
      return { response };
      // return res.data;
    }).catch((error) => {
      return { error };
    });
}

function* fetchAlbums() {
  try {
    const { response, error } = yield call(fetchDataAlbums);
    console.log('after yeild call');
    console.log(response);
    console.log(error);
    if (response) {
      console.log('success');
      yield put(albumsFetchSucceded({ albums: response.data }));
    } else {
      console.log('fail');
      console.log(error);
      yield put(albumsFetchFailed({ message: error.message }));
    }
  } catch (e) {
    console.log(e);
  }
}
export function* albumSaga() {
  // yield takeEvery('FETCH_ALBUMS', fetchAlbums);
  yield takeLatest(actionTypes.FETCH_ALBUMS, fetchAlbums);
}