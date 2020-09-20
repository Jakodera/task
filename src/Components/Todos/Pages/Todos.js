import React from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import { FETCH_TODOS_REQUEST, MARK_TODO_AS_COMPLETED_REQUEST, REMOVE_ITEM_REQUEST } from '../Actions/Actions'
import { THEME_BG_COLOR, THEME_COMPLETED_FONT_COLOR} from '../Pages/Styles';
import PropTypes from 'prop-types';
import { IconButton, Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton} from '@fluentui/react';


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

    constructor() { 
        super() 
        this.state = { 
          isOpen: false, 
        } 
      }

      open = () => this.setState({isOpen: true }) 

      close = () => this.setState({isOpen: false}) 


    componentDidMount() {
       this.props.dispatch({type: FETCH_TODOS_REQUEST})
    };


    mark = (id) => {
        this.props.dispatch({type: MARK_TODO_AS_COMPLETED_REQUEST, id});
    };


    removeItem = (id) => { 
        this.props.dispatch({type: REMOVE_ITEM_REQUEST, id});
    };

    generateTodos = (time) => {
        const dataItems = this.props.todosList;
        const todosItems = dataItems.map((todo, index) => 
            <div key={ index + "todo-container"} style={{marginTop: 2, display: "flex"}}>

                <Todo  key={ index + "todo"} onClick={ e => { e.preventDefault(); this.mark(todo.id) }}>

                    <TodoNumber>{index +1 }.</TodoNumber>

                    <TodoTitle color={getFontStyles(todo.completed)}>{todo.title}</TodoTitle>
                    {time|| " "}

                    { todo.completed }

                </Todo>
                { todo.completed ? <TodoRemover>
                    <IconButton 
                        iconProps={{iconName: 'trash', style: {color: "red"}}} 
                        onClick={ this.open}
                            // window.confirm("Are you sure you want to DELETE this item?")  
                            // this.removeItem(todo.id)
                             /> 


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
                { this.RenderTodos()}
                
            </div>
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