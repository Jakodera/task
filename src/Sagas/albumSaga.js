import axios from 'axios';
import {
  call,
  put,
  takeLatest
} from 'redux-saga/effects';
import * as actionTypes from '../Store/Actions/actionTypes';
import { albumsFetchSucceded, albumsFetchFailed } from '../Store/Actions/homeActions';

function fetchDataAlbums() {
  console.log('fetching...');
  return axios.get('https://jsonplaceholder.typicode.com/albums')
    .then((response) => {
      console.log('in axios');
      return { response };
      // return res.data;
    }).catch((error) => {
      return { error };
    });
}

// worker Saga: will be fired on FETCH_ALBUMS actions
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
    // yield put({ type: 'FETCH_ALBUMS_FAILED', payload: { message: e.message } });
  }
}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
export function* albumSaga() {
  // yield takeEvery('FETCH_ALBUMS', fetchAlbums);
  yield takeLatest(actionTypes.FETCH_ALBUMS, fetchAlbums);
}