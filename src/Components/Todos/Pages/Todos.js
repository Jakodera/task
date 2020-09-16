import React from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import { FETCH_TODOS_REQUEST, MARK_TODO_AS_COMPLETED_REQUEST, REMOVE_ITEM_REQUEST } from '../Actions/Actions'
import { THEME_BG_COLOR, THEME_COMPLETED_FONT_COLOR} from '../Pages/Styles';
import PropTypes from 'prop-types';
import { IconButton } from '@fluentui/react';

const TodosContainer = styled.div`
    cursor: pointer;
    box-sizing: border-box;
    width: 90vw;
    margin-top: 5vh;
    margin-bottom: 5vh;
    margin-left: auto;
    margin-right: auto;
    padding-top: 1rem;
    padding-bottom: 1rem;
`;

const TodoContainer = styled.div`
    margin-top: 1rem;
    display: flex;
`;

const Todo = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 1rem;
    background-color: ${THEME_BG_COLOR};
    flex-basis: 100%;
`;

const TodoNumber = styled.span`
    font-weight: bolder;
    margin-right: .5rem;
`;

const getFontStyles = completed => completed ? `color: ${THEME_COMPLETED_FONT_COLOR}; text-decoration: line-through;` : "";

const TodoTitle = styled.span`
    flex-basis: 100%;
    ${props => props.color}
`;

const TodoRemover = styled.div`
    padding: 1rem;
    background-color: ${THEME_BG_COLOR};
    border-radius: 1rem;
    margin-left: 1rem;
    cursor: pointer;
`;

const InformationContainer = styled.h1`
    display: flex;
    justify-content: center;
`;

class Todos extends React.Component {

    componentDidMount() {
       this.props.dispatch({type: FETCH_TODOS_REQUEST})
    };

    mark = (id) => {
        this.props.dispatch({type: MARK_TODO_AS_COMPLETED_REQUEST, id});
    };

    removeItem = (id) => {
        this.props.dispatch({type: REMOVE_ITEM_REQUEST, id});
    };

    generateTodos = () => {
        const dataItems = this.props.todosList;
        const todosItems = dataItems.map((todo, index) => 
            <TodoContainer key={ index + "todo-container"}>
                <Todo tabIndex="0" key={ index - "todo"} onClick={ e => { e.preventDefault(); this.mark(todo.id) }}>
                    <TodoNumber>{index +1 }.</TodoNumber>
                    <TodoTitle color={getFontStyles(todo.completed)}>{todo.title}</TodoTitle>
                    { todo.completed }
                </Todo>
                { todo.completed ? <TodoRemover onClick={ e => this.removeItem(todo.id) } tabIndex="0"><IconButton iconProps={{iconName: 'trash'}}></IconButton></TodoRemover> : null }
            </TodoContainer>
        );
        return todosItems;
    }

    RenderTodos = () => {
        if (this.props.todosLoading) {
            return <InformationContainer>Loading</InformationContainer>
        } else {
            return this.props.callApiFailed ? <InformationContainer>Api Call Failed Sorry: {this.props.todosList}</InformationContainer> : this.generateTodos();
        }
    }

    render() {
        return(
            <TodosContainer>
                { this.RenderTodos() }
            </TodosContainer>
        );
    }
}

Todos.propTypes = {
    callApiFailed: PropTypes.bool.isRequired,
    todosList: PropTypes.any,
    todosLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    todosList: state.todosReducer.todosList,
    callApiFailed: state.todosReducer.callApiFailed,
    todosLoading: state.todosReducer.todosLoading,
    canAddTodo: state.todosReducer.canAddTodo
});

export default connect(mapStateToProps)(Todos);