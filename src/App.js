// //         React
// import React, {Component, }from 'react';
// import { BrowserRouter as Router, Route} from 'react-router-dom';
// import ReactPaginate from 'react-paginate'
// import './App.css';
// //      Todos
// import AddTodo from './Components/Todos/Pages/AddTodo';
// import Todos from './Components/Todos/Pages/Todos'
// import Header from './Layouts/Header';
// //     PhotoAlbum 
// import Album from './Components/PhotoAlbum/Albums';
// import Photos from './Components/PhotoAlbum/Photos';
// //      Others
// import { Stack,} from "@fluentui/react"; 


// class App extends Component {

//   state = {
//     selectedAlbumId: false,
//     todos: [],
//     offset: 0,
//     perPage: 5,
//     currentPage: 0,
//     time: new Date().toLocaleString(),

//   };

//   handlePageChange(pageNumber) {
//     this.setState({activePage: pageNumber});
//   }

//   // componentDidMount(){
//   //   axios
//   //   .get('https://jsonplaceholder.typicode.com/todos')
//   //   .then(res =>{

//   //      this.setState(
//   //     {
//   //       todos: res.data,
//   //     })});
//   // }

//     // // Toggle Complete
//     // markComplete = (id) => {
//     //   this.setState({
//     //     todos: this.state.todos.map(todo => {
//     //       if (todo.id === id) {
//     //         todo.completed = !todo.completed;
//     //       }
//     //       return todo;
//     //     })
//     //   });
//     // };


//     // delTodo = (id)=> {
//     //   axios.delete('https://jsonplaceholder.typicode.com/todos/ $id')
//     //   .then(res =>this.setState({ todos: [...this.state.todos.filter(todo =>todo.id !== id)]}));
//     // }

//     // addTodo = (title,time) =>{
//     //    axios.post('https://jsonplaceholder.typicode.com/todos', {
//     //      title,
//     //      time,
//     //      completed: false
//     //    })
//     //    .then(res => this.setState({
//     //     todos: [...this.state.todos, res.data]
//     //   })
//     //   );
       
      
//     // }
//     handlePaginationClick = (e) => {
//       const selectedPage = e.selected;
//       const offset = selectedPage * this.state.perPage;
  
//       this.setState({
//           currentPage: selectedPage,
//           offset: offset 
//       });
  
//   };
//   render () {
//     const {todos }=this.state;
//     const sortedTodos=_.orderBy(todos,['index'],['desc'])
    
//     return(
//       <Router>
//       <div className="App">
//       <Stack horizontalAlign="center"> 
//       <div className= "Container">
//       <Header />
//       <Route exact path="/" render={props =>(
//         <React.Fragment>
//           <AddTodo />
//           <Todos todo= {sortedTodos}/>
          
//             {/* <AddTodo addTodo={this.addTodo}/> */}
//             {/* <Todos todos ={sortedTodos} markComplete={this.markComplete} delTodo = {this.delTodo}/> */}
//             <ReactPaginate
//                 previousLabel={"prev"}
//                 nextLabel={"next"}
//                 breakLabel={"{...}"}
//                 breakClassName={"break-me"}
//                 pageCount={this.state.pageCount}
//                 marginPagesDisplayed={2}
//                 pageRangeDisplayed={5}
//                 onPageChange={this.handlePaginationClick}
//                 containerClassName={"pagination"}
//                 subContainerClassName={"pages pagination"}
//                 activeClassName={"active"}/>
//         </React.Fragment>
//       )}/>

//         <Route path= "/album" component= {Album}/>
//         <Route path = "/photos" component ={Photos}/>
//     </div>
//     </Stack>
//     </div>
//     </Router>
//     );
//   }
// }

// export default App;
