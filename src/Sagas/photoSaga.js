import axios from 'axios';
import {
  call,
  put,
  takeLatest
} from 'redux-saga/effects';
import * as actionTypes from '../Store/Actions/actionTypes';
import { photosFetchSucceeded, photosFetchFailed } from '../Store/Actions/galleryActions';

function fetchDataPhotos(id) {
  return axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
    .then((response) => {
      console.log('in axios');
      return { response };
      // return res.data;
    }).catch((error) => {
      return { error };
    });
}

// worker Saga: will be fired on FETCH_ALBUMS actions
function* fetchPhotos(action) {
  try {
    const { response, error } = yield call(fetchDataPhotos, action.payload.id);
    console.log('after yeild call');
    console.log(action.payload.id);
    console.log(response);
    console.log(error);
    if (response) {
      console.log('success');
      yield put(photosFetchSucceeded({ photos: response.data }));
    } else {
      console.log('fail');
      console.log(error);
      yield put(photosFetchFailed({ message: error.message }));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* photoSaga() {
  yield takeLatest(actionTypes.FETCH_PHOTOS, fetchPhotos);
}
