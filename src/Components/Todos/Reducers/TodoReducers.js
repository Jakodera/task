// import { FETCH_TODOS_SUCCEEDED, FETCH_TODOS_FAILED, MARK_TODO_AS_COMPLETED_SUCCEEDED, REMOVE_ITEM_SUCCEEDED, SET_NEW_TODO_TITLE_SUCCEEDED, ADD_TODO_SUCCEEDED } from '../Actions/Actions';


// const initialState = {
//   todosList: null,
//   callApiFailed: false,
//   todosLoading: true,
//   newTodoTitle: '',

// };
  
// export default function todosReducer(state = initialState, action) {
//     switch(action.type) {
//       case FETCH_TODOS_SUCCEEDED:
//         return {
//           ...state,
//           callApiFailed: false,
//           todosList: action.data,
//           todosLoading: false,
//         }
//       case FETCH_TODOS_FAILED:
//         return {
//           ...state,
//           callApiFailed: true,
//           todosList: action.data,
//           todosLoading: false,
//           canAddTodo: false
//         }
//       case MARK_TODO_AS_COMPLETED_SUCCEEDED:
//           return {
//             ...state,
//             todosList: state.todosList.map(todo => {
//               if (todo.id !== action.id) {
//                 return todo;
//               }
//               return {
//                 ...todo,
//                 completed: !todo.completed,
//               };
//             })
//           }
//         case REMOVE_ITEM_SUCCEEDED:
//           return {
//             ...state,
//             todosList: state.todosList.filter(todo => todo.id !== action.id),
//           }
//         case SET_NEW_TODO_TITLE_SUCCEEDED:
//           return {
//             ...state,
//             newTodoTitle: action.title
//           }
//         case ADD_TODO_SUCCEEDED:
//           return {
//             ...state,
//             todosList: [
//               ...state.todosList,
//               {
//                 userId: 1,
//                 id: state.newId + 1,
//                 title: state.newTodoTitle,
//                 completed: false
//               }
//             ],
//             newId: state.newId + 1,
//           }
//       default: 
//         return state;
//     }
// };