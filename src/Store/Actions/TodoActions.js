import * as actionTypes from './actionTypes';

export const fetchAll = () => {
    return {
        type: actionTypes.FETCH_ALL
    }
}

export const fetchAllSuccess = (todos) => {
    return {
        type: actionTypes.FETCH_ALL_SUCCESS,
        payload: todos
    }

}

export const addTodo = (todo) => {
    return {
        type: actionTypes.ADD_TODO,
        payload: todo
    }
}

export const updateTodo = (todo) => {
    return {
        type: actionTypes.MARK_TODO_AS_COMPLETED_REQUEST,
        payload: todo
    }
}

export const deleteTodo = (id) => {
    return {
        type: actionTypes.DELETE_TODO,
        payload: id
    }
}