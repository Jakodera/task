import React, {Component, }from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Todos from './Components/Todos/Todos';
import Header from './Layouts/Header';
import AddTodo from './Components/Todos/AddTodo';
import Album from './Components/Albums/Albums';
import Photos from './Components/Photos/Photos'
import axios from 'axios';
import { Stack } from "@fluentui/react"; 
import _ from 'lodash';

class App extends Component {

  state = {
    todos: []
  };

  componentDidMount(){
    axios
    .get('https://jsonplaceholder.typicode.com/todos')
    .then(res =>{

      const unsortedTodos = res.data;
      _.orderBy(unsortedTodos, [unsortedTodos.id], ['desc'])
      
      // const sortedTodos =unsortedTodos.sort((a,b) =>a.id - b.id);
      this.setState(
      {
        todos:unsortedTodos,
        // todos: res.data,
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

    addTodo = (title) =>{
       axios.post('https://jsonplaceholder.typicode.com/todos', {
         title,
         completed: false
       })
       .then(res => this.setState({
        todos: [...this.state.todos, res.data]
      }));
    }

  render () {
    return(
      <Router>
      <div className="App">
      <Stack horizontalAlign="center"> 
      <div className= "Container">
      <Header />
      <Route exact path="/" render={props =>(
        <React.Fragment>
            <AddTodo addTodo={this.addTodo}/>
            <Todos todos ={this.state.todos} markComplete={this.markComplete} delTodo = {this.delTodo}/>
        </React.Fragment>
      )} />
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
