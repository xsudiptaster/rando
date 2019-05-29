import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Router} from 'react-router';
import routes from './routes';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Router history={browserHistory} routes={routes}/>, document.getElementById('root'));
registerServiceWorker();
