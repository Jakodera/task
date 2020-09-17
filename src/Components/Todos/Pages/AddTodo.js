import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SET_NEW_TODO_TITLE_REQUEST, ADD_TODO_REQUEST } from '../Actions/Actions';
import { PrimaryButton, Stack, TextField } from '@fluentui/react';


class AddTodo extends React.Component {

    setNewTodoTitle = title => this.props.dispatch({ type: SET_NEW_TODO_TITLE_REQUEST, title });

    addTodo = () => this.props.dispatch({ type: ADD_TODO_REQUEST });

    render() {
        return (
            <div>
                <Stack >
                    <TextField onChange={ e => this.setNewTodoTitle(e.target.value) } value={ this.props.newTodoTitle } type="text" placeholder="Add a new Todo Item" />
                    <PrimaryButton onClick={ e => this.addTodo() } title>
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
    newTodoTitle: state.todosReducer.newTodoTitle
});

export default connect(mapStateToProps)(AddTodo);