import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SET_NEW_TODO_TITLE_REQUEST, ADD_TODO_REQUEST } from '../Actions/Actions';
import { THEME_BG_COLOR, THEME_COMPLETED_FONT_COLOR } from '../Pages/Styles';

const AddTodoContainer = styled.header`
    display: flex;
    background-color: ${THEME_BG_COLOR};
    justify-content: center;
    padding-top: .5rem;
    padding-bottom: .5rem;
`;

const AddTodoUI = styled.div`
    display: flex;
    width: 90vw;
`;

const AddTodoInput = styled.input`
    background-color: transparent;
    border: none;
    border-bottom: 1px solid;
    padding: .5rem;
    flex-basis: 100%;
`;

const AddTodoButton = styled.button`
    cursor: pointer;
    margin-left: 1rem;
    white-space: nowrap;
    background-color: ${THEME_COMPLETED_FONT_COLOR};
    border: none;
    border-radius: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-weight: bolder;
`;



class AddTodo extends React.Component {

    setNewTodoTitle = title => this.props.dispatch({ type: SET_NEW_TODO_TITLE_REQUEST, title });

    addTodo = () => this.props.dispatch({ type: ADD_TODO_REQUEST });

    render() {
        return (
            <AddTodoContainer>
                <AddTodoUI >
                    <AddTodoInput onChange={ e => this.setNewTodoTitle(e.target.value) } value={ this.props.newTodoTitle } type="text" placeholder="Add Todo" />
                    <AddTodoButton onClick={ e => this.addTodo()  } 
                        title>
                    Add Todo</AddTodoButton>
                </AddTodoUI>
            </AddTodoContainer>
        );
    }
}

AddTodo.propTypes = {
    canAddTodo: PropTypes.bool.isRequired,
    newTodoTitle: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    canAddTodo: state.todosReducer.canAddTodo,
    newTodoTitle: state.todosReducer.newTodoTitle
});

export default connect(mapStateToProps)(AddTodo);