import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as homeActions from '../Store/Actions/homeActions';



class Home extends Component {
  componentDidMount() {
    const { loadAlbums } = this.props;
    loadAlbums();
  }

  linkClicked = (albumId, albumTitle) => {
    const {
      history,
      setAlbumTitle
    } = this.props;
    // console.log(`${albumId}`);
    // console.log(albumTitle);
    setAlbumTitle(albumTitle);
    history.push(`/photos?albumId=${albumId}`);
  }

  render() {
    const {
      albumLinks
    } = this.props;

    const mappedItems = albumLinks.map((album, index) => {
      return (
        <div
          key={index}
          onClick={() => this.linkClicked(album.id, album.title)}
          style={{ padding: '10px', border: '1px solid', margin: '10px' }}
        >{album.title}
        </div>
      );

    });

    return (
      <div style={{ textAlign: 'center' }}>
        {/* <p>Home</p> */}
        {/* <button type="submit" onClick={this.buttonClicked}>Fetch</button> */}
        <div style={{ display: 'inline-block', border: '2px solid', width: '400px'}}>
          <p style={{ textAlign: 'center', color: 'blue' }}>List of Albums</p>
          {this.renderTodos}
          {mappedItems}
        </div>
       </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    albumLinks: state.homeReducer.albumLinks,
    albumId: state.homeReducer.albumId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onSomeButtonClicked: (albumId) => dispatch(homeActions.someButtonClicked(albumId)),
    loadAlbums: () => dispatch(homeActions.loadAlbums()),
    setAlbumTitle: (albumTitle) => dispatch(homeActions.setAlbumTitle(albumTitle))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
