import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import createSagaMiddleware from 'redux-saga';
import RootSaga from './Components/Todos/Sagas/Saga';
import { createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import reducer from './Components/Todos/Reducers/Reducers';
import { Fabric, initializeIcons } from "@fluentui/react"; 
// import RestController from './Components/PhotoAlbum/Photos'

initializeIcons();

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  compose(
  applyMiddleware(sagaMiddleware),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
sagaMiddleware.run(RootSaga)

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

