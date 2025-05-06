import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.js'
import App from './App.js';
import { store } from '../src/redux/store/store.js'

import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);


