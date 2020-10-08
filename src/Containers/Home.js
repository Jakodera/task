import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as homeActions from '../Store/Actions/homeActions';
import Paginator from 'react-js-paginator';



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
        <div style={{ display: 'inline-block', border: '2px solid', width: '400px'}}>
          <p style={{ textAlign: 'center', color: 'blue' }}>List of Albums</p>
          {mappedItems}
          <Paginator
          pageSize={20}
          totalElements={200}
          maxPagesToDisplay={5}
          onPageChangeCallback={(e) => {this.pageChange(e)}}
          pageBoxStyle={{border: 0, color: 'black', padding: 3, fontSize: 16}}
          activePageBoxStyle={{fontWeight: 'bolder', color: 'green', backgroundColor: '#d7f7dc'}}
          firstArrowAlwaysVisible
          lastArrowAlwaysVisible
        />
        </div>
       </div>
    );
  }
  pageChange(content){
    this.setState({currentPage: content});
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
    loadAlbums: () => dispatch(homeActions.loadAlbums()),
    setAlbumTitle: (albumTitle) => dispatch(homeActions.setAlbumTitle(albumTitle))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
