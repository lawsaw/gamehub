import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import socketIOClient from 'socket.io-client';
import Root from './Root';
import { apiRequest } from './helpers/etc';
import { SOCKET_SERVER } from "./helpers/constants";
import SnackbarContext from "./helpers/SnackbarContext";
import ResponseContext from "./helpers/ResponseContext";
import SocketContext from './helpers/SocketContext';
import mainReducer from "./reducers";

const IO = socketIOClient(SOCKET_SERVER);

const store = createStore(
    mainReducer,
    applyMiddleware(
        thunk,
        apiRequest(IO),
    )
);

class App extends PureComponent {

    showSnackbar = (message, type="default") => {//TODO: type: 'default' | 'success' | 'error' | 'info
        const { enqueueSnackbar } = this.props;
        enqueueSnackbar(message, {
            variant: type,
            autoHideDuration: 2500,
        });
    }

    validateResponse = (response, callback) => {
        if(response && response.error) {
            this.showSnackbar(response.error, 'error');
        } else {
            if(callback && typeof callback === 'function') callback(response);
        }
    }

    render() {
        return (
            <SnackbarContext.Provider value={this.showSnackbar}>
                <ResponseContext.Provider value={this.validateResponse}>
                    <SocketContext.Provider value={IO}>
                        <Provider
                            store={store}
                        >
                            <Root />
                        </Provider>
                    </SocketContext.Provider>
                </ResponseContext.Provider>
            </SnackbarContext.Provider>
        )
    }

}

export default withSnackbar(App);
