import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ADD_TODO } from '../Store/Actions/actionTypes';
import { PrimaryButton, Stack, TextField } from '@fluentui/react';


class AddTodo extends React.Component {
    state = {
        title: ''
    }
    // setNewTodoTitle = title => this.props.dispatch({ type: SET_NEW_TODO_TITLE_REQUEST, title });

    addTodo = () => {
        console.log({title: this.state.title});
        const todo = {userId: 20, id: 21, title: this.state.title, completed: false}
        this.props.addTodo(todo); 
        this.setState({ title: '' });     
    }

    render() {
        return ( 
            <div>
                <Stack>
                    <TextField
                     onChange={({ target }) => this.setState({title: target.value})} 
                     value={this.state.title}
                     type="text" 
                     placeholder="Add a new Todo Item" 
                    />
                    <PrimaryButton onClick={() => this.addTodo()} title>
                    Add
                    </PrimaryButton>
                </Stack>
            </div>
        );
    }
}

AddTodo.propTypes = {
    newTodoTitle: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    newTodoTitle: state.todoReducer.newTodoTitle
});

const mapDispatchToProps = (dispatch) => ({
    addTodo: (todo) => dispatch({type: ADD_TODO, todo})
})
export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);