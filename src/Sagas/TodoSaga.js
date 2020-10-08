import { all, fork, call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { FETCH_ALL, MARK_TODO_AS_COMPLETED_REQUEST, MARK_TODO_AS_COMPLETED_REQUEST_SUCCESS, 
DELETE_TODO, DELETE_TODO_SUCCESS, ADD_TODO, ADD_TODO_SUCCESS } from '../Store/Actions/actionTypes';
import axios from 'axios'
import {fetchAllSuccess} from '../Store/Actions/TodoActions.js'

function getJsonplaceholderData(id) {
    console.log('fetching...');
    return axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((response) => {
        return { response };
        // return res.data;
      }).catch((error) => {
        return { error };
      });
  }

function* fetchTodos() {
    const { response:res, } = yield call(getJsonplaceholderData);
  
    if (res.status === 200) {
        yield put(fetchAllSuccess( res.data));
    } else {
        // yield put({ type: FETCH_TODOS_FAILED, data: err.error });
    }    
}

function* markAsCompleted(action) {
    yield put({ type: MARK_TODO_AS_COMPLETED_REQUEST_SUCCESS, id: action.id});
}

function* removeItem(action) {
    yield put({ type: DELETE_TODO_SUCCESS, id: action.id });
}

function* addTodo() {
    yield put({ type: ADD_TODO_SUCCESS });
}


function* observeIfTitleShouldBeChanged() {
    // yield takeEvery(ADD_TODO_SUCCESS, setInputValue);
    // yield takeEvery(SET_NEW_TODO_TITLE_REQUEST, setInputValue);
}

function* observeCallApiAction() {
    yield takeLatest(FETCH_ALL, fetchTodos);
};

function* observeMarkAsDoneAction() {
    yield takeEvery(MARK_TODO_AS_COMPLETED_REQUEST, markAsCompleted);
}

function* observeRemoveItemAction() {
    yield takeEvery(DELETE_TODO, removeItem);
}

function* observeAddTodoAction() {
    yield takeEvery(ADD_TODO, addTodo) 
}

export default function* RootSaga() {
    yield all([
        fork(observeCallApiAction),
        fork(observeMarkAsDoneAction),
        fork(observeRemoveItemAction),
        fork(observeAddTodoAction),
        fork(observeIfTitleShouldBeChanged)
    ]);
};