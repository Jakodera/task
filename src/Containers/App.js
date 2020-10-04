//         React
import React, {Component }from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
// import './App.css';
//      Todos
import Gallery from './Gallery';
import Todos from './Todos'
import Home from './Home';
// import AddTodos from './AddTodo'
//      Others
import { Stack} from "@fluentui/react"; 
import Header from '../Layouts/Header';
// import Pagination from 'office-ui-fabric-react-pagination';


class App extends Component {

  state = {
    todos: [],
    time: new Date().toLocaleString(),

  };
  render () {
    return( 
      
      <Router>
      <div className="App">

      <Stack horizontalAlign="center"> 
      <div className= "Container">
        <Header/>


        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/Todos" exact component={Todos} />
          <Route path="/photos" exact component={Gallery} />
          <Redirect exact from="/" to="/home" />
        </Switch>

        {/* <Pagination
        currentPage={1}
        totalPages={10}
        onChange={{}}/> */}
     
    </div>
    </Stack>
    </div>
    </Router>
    );
  }
}

export default App;
