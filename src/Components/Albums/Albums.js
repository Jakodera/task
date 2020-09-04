import React from 'react';
import { DetailsList } from '@fluentui/react';
// import { Dropdown } from "@fluentui/react"; 
class Albums extends React.Component {
  constructor() {
    super()
    this.state = {
      albums: [],
      perPage: 5,
      currentPage: 0,
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then(response => response.json())
      .then(albums => { this.setState({ Loaded: true, albums }) },
      error => { this.setState({ Loaded: true, error }); })
  }

  render() {
    const { error, Loaded, albums } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!Loaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {albums.map(album => (<li key={album.id}>{album.title}</li>))} 
        </ul>
       

      );
    }
  }
}
export default Albums