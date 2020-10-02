// import React from 'react';
import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  albumLinks: [],
  albumId: null,
  albumTitle: null
};

const fetchAlbums = (state) => {
  // console.log(`id is : ${action.payload.albumId}`);
  return {
    ...state
  };
};

const fas = (state, action) => {
  // console.log(`albumdata is : ${action.payload.albums}`);
  console.log(action.payload.albums);
  return {
    ...state,
    albumLinks: action.payload.albums
  };
};

const faf = (state, action) => {
  // console.log(`albumdata is : ${action.payload.albums}`);
  console.log(action.payload.message);
  return {
    ...state,
    albumLinks: []
  };
};

const sat = (state, action) => {
  return {
    ...state,
    albumTitle: action.payload.albumTitle
  };
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALBUMS: return fetchAlbums(state, action);
    case actionTypes.FETCH_ALBUMS_SUCCEEDED: return fas(state, action);
    case actionTypes.FETCH_ALBUMS_FAILED: return faf(state, action);
    case actionTypes.SET_ALBUM_TITLE: return sat(state, action);
    default: return state;
  }
};

export default homeReducer;
