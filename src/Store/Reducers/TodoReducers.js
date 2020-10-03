import {FETCH_ALL, FETCH_ALL_SUCCESS, MARK_TODO_AS_COMPLETED_REQUEST_SUCCESS, SET_NEW_TODO_TITLE_REQUEST,  DELETE_TODO_SUCCESS, ADD_TODO } from '../Actions/actionTypes';


const initialState = {
  todosList: null,
  callApiFailed: false,
  todosLoading: true,
  newTodoTitle: '',
};

  
export default function todosReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_ALL_SUCCESS:
        return {
          ...state,
          callApiFailed: false,
          todosList: action.payload,
          todosLoading: false,
        }
      case FETCH_ALL:
        return {
          ...state,
          callApiFailed: false,
          todosList: action.data,
          todosLoading: false,
        }
      // case FETCH_TODOS_FAILED:
      //   return {
      //     ...state,
      //     callApiFailed: true,
      //     todosList: action.data,
      //     todosLoading: false,
      //     canAddTodo: false
      //   }
      case MARK_TODO_AS_COMPLETED_REQUEST_SUCCESS:
          return {
            ...state,
            todosList: state.todosList.map(todo => {
              if (todo.id !== action.id) {
                return todo;
              }
              return {
                ...todo,
                completed: !todo.completed,
              };
            })
          }
        case DELETE_TODO_SUCCESS:
          console.log({id: action.id});
          
          return {
            ...state,
            todosList: state.todosList.filter(todo => todo.id !== action.id),
          }
        case SET_NEW_TODO_TITLE_REQUEST:
          return {
            ...state,
            newTodoTitle: action.title
          }
        case ADD_TODO:          
          return {
            ...state,
            todosList: [
              action.todo,
              ...state.todosList
            ]
          }
        // case FETCH_ALL_SUCCESS:
        //   return {
        //     ...state,
        //     todosList: [
        //       ...state.todosList,
        //       {
        //         userId: 1,
        //         id: state.newId + 1,
        //         title: state.newTodoTitle,
        //         completed: false
        //       }
        //     ],
        //     newId: state.newId + 1,
        //   }
      default: 
        return state;
    }
};