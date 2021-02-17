import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.min.css';
import 'react-toastify/dist/ReactToastify.css';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);