import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Fabric, initializeIcons } from "@fluentui/react"; 
import RestController from './Components/Photos/Photos'

initializeIcons();

ReactDOM.render(
  <React.StrictMode>
    <Fabric>
    <App >
      <RestController/>
    </App>
  
    </Fabric>
  </React.StrictMode>,
  document.getElementById('root')
);

