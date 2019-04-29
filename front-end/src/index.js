import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "./index.css";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import reducers from './reducers'

const logger = createLogger();
const store = createStore(reducers, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </MuiThemeProvider>
    , document.getElementById('root'));

serviceWorker.unregister();
