import React, {Component, }from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Todos from './Components/Todos/Todos';
import Header from './Layouts/Header';
import AddTodo from './Components/Todos/AddTodo';
import Album from './Components/Albums/Albums';
import Photos from './Components/Photos/Photos'
import axios from 'axios';
import { Stack,} from "@fluentui/react"; 
import _ from 'lodash';
import Pagination from "react-js-pagination";


class App extends Component {

  state = {
    todos: [],
    activePage: 10

  };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }
  

  componentDidMount(){
    axios
    .get('https://jsonplaceholder.typicode.com/todos')
    .then(res =>{

       this.setState(
      {
        todos: res.data,
      })});
  }

    // Toggle Complete
    markComplete = (id) => {
      this.setState({
        todos: this.state.todos.map(todo => {
          if (todo.id === id) {
            todo.completed = !todo.completed;
          }
          return todo;
        })
      });
    };

    delTodo = (id)=> {
      axios.delete('https://jsonplaceholder.typicode.com/todos/ $id')
      .then(res =>this.setState({ todos: [...this.state.todos.filter(todo =>todo.id !== id)]}));
    }

    addTodo = (title,time) =>{
       axios.post('https://jsonplaceholder.typicode.com/todos', {
         title,
         time,
         completed: false
       })
       .then(res => this.setState({
        todos: [...this.state.todos, res.data]
      })
      );
       
      
    }

  render () {
    const {todos }=this.state;
    const sortedTodos=_.orderBy(todos,['id'],['desc'])
    
    return(
      <Router>
      <div className="App">
      <Stack horizontalAlign="center"> 
      <div className= "Container">
      <Header />
      <Route exact path="/" render={props =>(
        <React.Fragment>
            <AddTodo addTodo={this.addTodo}/>
            <Todos todos ={sortedTodos} markComplete={this.markComplete} delTodo = {this.delTodo}/>
        </React.Fragment>
      )} />

       <Pagination
          paginationSize= {15}
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
        <Route path= "/album" component= {Album}/>
        <Route path = "/photos" component ={Photos}/>
    </div>
    </Stack>
    </div>
    </Router>
    );
  }
}

export default App;
