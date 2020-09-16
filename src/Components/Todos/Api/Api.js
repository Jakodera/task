import axios from 'axios';

const callTodosApi = async () => {

        // addTodo = (title,time) =>{
    //    axios.post('https://jsonplaceholder.typicode.com/todos', {
    //      title,
    //      time,
    //      completed: false
    //    })
    //    .then(res => this.setState({
    //     todos: [...this.state.todos, res.data]
    //   })
    //   );
    let res, err;
    await axios.get('https://jsonplaceholder.typicode.com/todos')
    .then((response) => {
        res = response;
    })
    .catch((error) => {
        err = { error: error.message || 'Unknown error' };
    });

    return { res, err };
};

export default callTodosApi;