import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import SocketContext from './helpers/SocketContext';
import thunk from 'redux-thunk';
import socketIOClient from 'socket.io-client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import theme from './helpers/theme';
import App from './App';
import mainReducer from './reducers';
import { SOCKET_SERVER } from "./helpers/constants";
import { createSocketEmitMiddleware, apiRequest } from './helpers/etc';

const IO = socketIOClient(SOCKET_SERVER);

const store = createStore(
    mainReducer,
    applyMiddleware(
        thunk,
        //createSocketEmitMiddleware(IO),
        apiRequest(IO),
    )
);

const Component = () => {
    return (
        <Router>
            <Provider
                store={store}
            >
                <MuiThemeProvider theme={theme}>
                    <SnackbarProvider maxSnack={3} anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}>
                        <CssBaseline />
                        <SocketContext.Provider value={IO}>
                            <Route component={App} />
                        </SocketContext.Provider>
                    </SnackbarProvider>
                </MuiThemeProvider>
            </Provider>
        </Router>
    )
};

ReactDOM.render(Component(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
