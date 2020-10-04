import React from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import { FETCH_ALL, MARK_TODO_AS_COMPLETED_REQUEST, DELETE_TODO_SUCCESS } from '../Store/Actions/actionTypes'
import { THEME_BG_COLOR, THEME_COMPLETED_FONT_COLOR} from './Styles';
import PropTypes from 'prop-types';
import { IconButton, Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton} from '@fluentui/react';
import AddTodo from './AddTodo.js';


const Todo = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 1rem;
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

    constructor() { 
        super() 
        this.state = { 
          isOpen: false, 
        } 
      }

      open = () => this.setState({isOpen: true }) 

      close = () => this.setState({isOpen: false});


    componentDidMount() {
       this.props.dispatch({type: FETCH_ALL})
    };


    mark = (id) => {
        this.props.dispatch({type: MARK_TODO_AS_COMPLETED_REQUEST, id});
    };


    removeItem = (id) => {   
        this.props.dispatch({type: DELETE_TODO_SUCCESS, id});
        this.setState({isOpen: false});
    };

    generateTodos = (time) => {
        const dataItems = this.props.todosList||[]; 
        
        const todosItems = dataItems.map((todo, index) => 
            <div key={ index + "todo-container"} 
            style={{marginTop: 2, border: '1px solid', display: "flex", padding: '10px', margin: '10px'}}>

                <Todo  key={ index + "todo"} onClick={ e => { e.preventDefault(); this.mark(todo.id) }}>

                    <TodoNumber>{index + 1}.</TodoNumber>

                    <TodoTitle color={getFontStyles(todo.completed)}>{todo.title}</TodoTitle>
                    {time|| " "}

                    { todo.completed }

                </Todo>
                { todo.completed ? <TodoRemover>
                    <IconButton 
                        iconProps={{iconName: 'trash', style: {color: "red"}}} 
                        onClick={ this.open} /> 

                <Dialog
                    isOpen={this.state.isOpen}
                    dialogContentProps={{
                       type: DialogType.close,
                       title: 'DELETE',
                       subText: 'Are you sure you want to delete this item?',
                    }}
                    modalProps={{
                       isBlocking: false
                    }}
                    onDismiss={this.close.bind(this)} 
                > 
                <DialogFooter> 
                    <DefaultButton text="No" onClick={() => {this.close() }} />
                    {/* <PrimaryButton  onClick={() =>{this.removeItem(todo.id)}}>OK</PrimaryButton>  */}
                    <PrimaryButton text="OK" onClick={() => {this.removeItem(todo.id) }} />  
                </DialogFooter> 
                </Dialog> 
                </TodoRemover> : null }
            </div>   
        );
        return todosItems;
    }

    RenderTodos = () => {
        if (this.props.todosLoading) {
            return <InformationContainer>Loading</InformationContainer>
        } else {
            return this.props.callApiFailed ? <InformationContainer>Api Call Failed Sorry: {this.props.todosList}</InformationContainer> : this.generateTodos(new Date().toLocaleString());
        }
    }

    render() {
        return(
            <div>
         <div 
         style={{ display: 'inline-block', border: '2px solid', width: '400px'}}
         >
          <p style={{ textAlign: 'center', color: 'blue' }}>List of Todos</p>
                <AddTodo/>
                { this.RenderTodos()}
                </div> 
    
            </div>
        );
    }
}



Todos.propTypes = {
    // callApiFailed: PropTypes.bool.isRequired,
    todosList: PropTypes.any,
    todosLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    todosList: state.todoReducer.todosList,

    // todosList: selectAllTodos(state),
    callApiFailed: state.todoReducer.callApiFailed,
    todosLoading: state.todoReducer.todosLoading,
    canAddTodo: state.todoReducer.canAddTodo
});

export default connect(mapStateToProps)(Todos);











/* <ul> */
/* <Todos/> */
/* {todosList?.map((todo) =><li key={todo.id}>{todo.title}</li>)} */
// </ul> 