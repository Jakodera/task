import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import '../../App.css'
import { Stack } from "@fluentui/react"; 

class Photos extends Component {
  constructor(props) {
    super();
    this.state = {
      offset: 0,
      data: [],
      perPage: 5,
      currentPage: 0,
    };
  };

  async componentDidMount() {
    const {data}=await
     axios.get('https://jsonplaceholder.typicode.com/albums/1/photos?albumId=1');
                //  const data = res.data;
            const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            const postData = slice.map(pd => 
            <React.Fragment>
                <p>{pd.title}</p>
                <img src={pd.thumbnailUrl} alt=""/>
            </React.Fragment>)
    this.setState({
        pageCount: Math.ceil(data.length /this.state.perPage),
        postData
    });
  }

//   fetchData() {
//     axios
//         .get(`https://jsonplaceholder.typicode.com/albums/1/photos?albumId=1`)
//         .then(res => {
//             const data = res.data;
//             const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
//             const postData = slice.map(pd => <React.Fragment>
//                 <p>{pd.title}</p>
//                 <img src={pd.thumbnailUrl} alt=""/>
//             </React.Fragment>)
//             this.setState({
//                 pageCount: Math.ceil(data.length / this.state.perPage),
//                 postData
//             })
//         });
// }
handlePaginationClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.componentDidMount()
    });

};

// componentDidMount() {
//     this.fetchData()
// }
render() {
    return (
        <div>
        <Stack horizontalAlign="space-between">
            {this.state.postData}
            <Stack style={{ width: 500 }}>
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"{...}"}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePaginationClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}/>
            </Stack>
            </Stack>
        </div>
    )
  } 
}

export default Photos;