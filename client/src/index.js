import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import UpsertApp from "./UpsertApp";

ReactDOM.render(<BrowserRouter>
    <Route path='/' component={App}/>
    <Route path='/upsert' component={UpsertApp}/>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
