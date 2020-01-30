import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import SocketContext from './helpers/SocketContext';
import thunk from 'redux-thunk';
import socketIOClient from 'socket.io-client';
import socketIoMiddleware from 'redux-socket.io-middleware';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import theme from './helpers/theme';
import Root from './Root';
import mainReducer from './reducers';
import { SOCKET_SERVER, SOCKET_MAP, SOCKET_CLIENT } from "./helpers/constants";


import { createSocketEmitMiddleware, createSocketListenMiddleware } from './helpers/etc';

const IO = socketIOClient(SOCKET_SERVER);

const store = createStore(
    mainReducer,
    applyMiddleware(
        thunk,
        createSocketEmitMiddleware(IO),
        //createSocketListenMiddleware(IO),
    )
);


//let socket = null;

SOCKET_MAP.forEach(({ game, method }) => {
    IO[method] = (action, request) => {
        IO.emit(SOCKET_CLIENT, {
            game,
            action,
            ...request,
        });
    };
});

class App extends PureComponent {

    render() {
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
                                <Route component={Root} />
                            </SocketContext.Provider>
                        </SnackbarProvider>
                    </MuiThemeProvider>
                </Provider>
            </Router>
        )
    }

}

export default App;
