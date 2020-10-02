import axios from 'axios';
import {
  call,
  put,
  // takeEvery,
  takeLatest
} from 'redux-saga/effects';
import * as actionTypes from '../Store/Actions/actionTypes';
import { photosFetchSucceeded, photosFetchFailed } from '../Store/Actions/galleryActions';

function fetchDataPhotos(id) {
  console.log('fetching...');
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
    // yield put({ type: 'FETCH_ALBUMS_FAILED', payload: { message: e.message } });
  }
}

export function* photoSaga() {
  // console.log('hello world');
  // yield takeEvery('FETCH_ALBUMS', fetchAlbums);
  yield takeLatest(actionTypes.FETCH_PHOTOS, fetchPhotos);
}
/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
  function* mySaga() {
    yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
  }
*/
// export default mySaga;
// To run our Saga, we'll have to connect it to the Redux Store using the redux-saga middleware.
