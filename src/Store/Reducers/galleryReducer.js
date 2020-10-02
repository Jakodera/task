import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  photos: [],
  // thumbnails: [],
  // queryId: null,
  chosenPhoto: null
};

const fetchPhotos = (state) => {
  // console.log(`id is : ${action.payload.albumId}`);
  return {
    ...state
  };
};

const fps = (state, action) => {
  // console.log(`phtodata is : ${action.payload.photos}`);
  console.log(action.payload.photos);
  return {
    ...state,
    photos: action.payload.photos
  };
};

const fpf = (state, action) => {
  // console.log(`phtodata is : ${action.payload.photos}`);
  console.log(action.payload.message);
  return {
    ...state,
    photos: []
  };
};

const resetId = (state) => {
  // console.log(action.payload.queryId);
  return {
    ...state,
    chosenPhoto: null
  };
};

const setPhoto = (state, action) => {
  return {
    ...state,
    chosenPhoto: action.payload.id[0]
  };
};

const galleryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PHOTOS: return fetchPhotos(state, action);
    case actionTypes.FETCH_PHOTOS_SUCCEEDED: return fps(state, action);
    case actionTypes.FETCH_PHOTOS_FAILED: return fpf(state, action);
    case actionTypes.RESET_ID: return resetId(state, action);
    case actionTypes.SET_PHOTO: return setPhoto(state, action);
    default: return state;
  }
};

export default galleryReducer;
