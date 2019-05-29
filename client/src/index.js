import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Router} from 'react-router-dom';
import routes from './routes';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Router history={BrowserRouter} routes={routes}/>, document.getElementById('root'));
registerServiceWorker();
