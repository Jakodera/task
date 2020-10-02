import * as actionTypes from './actionTypes';

export const loadPhotos = (id) => {
  return {
    type: actionTypes.FETCH_PHOTOS,
    payload: { id }
  };
};

export const resetId = () => {
  return {
    type: actionTypes.RESET_ID
  };
};

export const setPhoto = (id) => {
  return {
    type: actionTypes.SET_PHOTO,
    payload: { id }
  };
};

export const photosFetchSucceeded = (payload) => {
  return {
    type: actionTypes.FETCH_PHOTOS_SUCCEEDED,
    payload
  };
};

export const photosFetchFailed = (payload) => {
  return {
    type: actionTypes.FETCH_PHOTOS_FAILED,
    payload
  };
};
