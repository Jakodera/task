import * as actionTypes from './actionTypes';


export const loadAlbums = () => {
  return {
    type: actionTypes.FETCH_ALBUMS
  };
};

export const albumsFetchSucceded = (payload) => {
  return {
    type: actionTypes.FETCH_ALBUMS_SUCCEEDED,
    payload
  };
};

export const albumsFetchFailed = (payload) => {
  return {
    type: actionTypes.FETCH_ALBUMS_FAILED,
    payload
  };
};

export const setAlbumTitle = (albumTitle) => {
  return {
    type: actionTypes.SET_ALBUM_TITLE,
    payload: { albumTitle }
  };
};
