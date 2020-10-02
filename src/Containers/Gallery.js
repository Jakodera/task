import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';

import * as galleryActions from '../Store/Actions/galleryActions';
import * as homeActions from '../Store/Actions/homeActions';
import './Gallery.css';

class Gallery extends React.Component {
  componentDidMount() {
    const {
      loadPhotos,
      location,
      resetId,
      loadAlbums
    } = this.props;
    const values = queryString.parse(location.search);
    console.log(values.albumId);
    resetId();
    loadAlbums();
    // console.log(albumId);
    loadPhotos(values.albumId);
  }

  setChosenPhoto = (id) => {
    const { setPhoto, photos } = this.props;
    console.log(id);
    const filteredPhoto = photos.filter((photo) => {
      return (photo.id === id);
    });
    setPhoto(filteredPhoto);
  }

  render() {
    const {
      photos,
      chosenPhoto,
      // albumTitle,
      albumLinks,
      location
    } = this.props;

    const values = queryString.parse(location.search);

    const mappedThumbnails = photos.map((thumb, index) => {
      return (
        <div key={index} onClick={() => this.setChosenPhoto(thumb.id)}>
          <img alt="oops" src={thumb.thumbnailUrl} />
        </div>
      );
    });

    return (
      <div className="bodyContainer">
        <p style={{ textAlign: 'center' }}>Gallery</p>
        <Link to="/home">Back</Link>
        <hr />
        {console.log(albumLinks[values.albumId - 1])}
        {albumLinks[values.albumId - 1] ? <h1>Album Title: {albumLinks[values.albumId - 1].title}</h1> : <h1>Album Title loading: </h1>}
        <div className="leftContainer">
          <h1>Photo Thumbnails</h1>
          <ul>
            {mappedThumbnails}
          </ul>
        </div>
        <div className="rightContainer">
          <h1>Photo</h1>
          {chosenPhoto ? <img alt="oops" src={chosenPhoto.url} /> : <p>Choose an image</p>}
        </div>
        {console.log(this.props)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chosenPhoto: state.galleryReducer.chosenPhoto,
    photos: state.galleryReducer.photos,
    thumbnails: state.galleryReducer.thumbnails,
    // albumTitle: state.homeReducer.albumTitle,
    albumLinks: state.homeReducer.albumLinks
    // albumId: state.galleryReducer.albumId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onSomeButtonClicked: (albumId) => dispatch(homeActions.someButtonClicked(albumId)),
    loadPhotos: (albumId) => dispatch(galleryActions.loadPhotos(albumId)),
    resetId: () => dispatch(galleryActions.resetId()),
    setPhoto: (id) => dispatch(galleryActions.setPhoto(id)),
    loadAlbums: () => dispatch(homeActions.loadAlbums())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
