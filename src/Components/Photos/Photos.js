import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import '../../App.css'
import { Stack } from "@fluentui/react"; 

class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 5,
      currentPage: 0,
    };
  };

  receivedData() {
    axios
        .get(`https://jsonplaceholder.typicode.com/albums/1/photos?albumId=1`)
        .then(res => {

            const data = res.data;
            const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            const postData = slice.map(pd => <React.Fragment>
                <p>{pd.title}</p>
                <img src={pd.thumbnailUrl} alt=""/>
            </React.Fragment>)
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
               
                postData
            })
        });
}
handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.receivedData()
    });

};

componentDidMount() {
    this.receivedData()
}
render() {
    return (
        <div>
        <Stack horizontalAlign="space-between">
            {this.state.postData}
            <Stack style={{ width: 500 }}>
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
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