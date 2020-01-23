import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import SocketContext from './helpers/SocketContext';
import socketIOClient from 'socket.io-client';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import theme from './helpers/theme';
import Root from './Root';
import mainReducer from './reducers';
import { SOCKET_SERVER } from "./helpers/constants";

const store = createStore(
    mainReducer
);

let socket = socketIOClient(SOCKET_SERVER);

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
                            <SocketContext.Provider value={socket}>
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
