import React from 'react';
import ReactDOM from 'react-dom';
// import './Containers/';
import App from './Containers/App';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import { Provider } from 'react-redux';
// import rootReducer from './Store/Reducers';
import { Fabric, initializeIcons } from "@fluentui/react"; 

import mySaga from './Sagas/rootSaga'
import todoReducer from './Store/Reducers/TodoReducers';
import homeReducer from './Store/Reducers/homeReducer';
import galleryReducer from './Store/Reducers/galleryReducer'
import logger from 'redux-logger';

initializeIcons();

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  todoReducer,
  homeReducer,
  galleryReducer
});

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}



const store = createStore(
  rootReducer,
  compose(
  applyMiddleware(...middlewares),
))
sagaMiddleware.run(mySaga)

ReactDOM.render(
  <React.StrictMode>
    <Fabric>
      <Provider store={store}>
    <App />
      </Provider>
      {/* <RestController/> */}
    </Fabric>,
  </React.StrictMode>,
  document.getElementById('root')
);

