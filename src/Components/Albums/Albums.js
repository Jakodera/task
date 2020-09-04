import React from 'react';
import axios from 'axios';
class Albums extends React.Component {
  constructor() {
    super()
    this.state = {
      albums: [],
      Loaded:false,
    };
  }

  async componentDidMount() {
    const {data:albums}=await axios.get('https://jsonplaceholder.typicode.com/albums');
    this.setState({albums,Loaded:true});
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