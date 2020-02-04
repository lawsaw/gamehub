import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import Root from './Root';
import SnackbarContext from "./helpers/SnackbarContext";
import ResponseContext from "./helpers/ResponseContext";

class App extends PureComponent {

    showSnackbar = (message, type="default") => {//TODO: type: 'default' | 'success' | 'error' | 'info
        const { enqueueSnackbar } = this.props;
        enqueueSnackbar(message, {
            variant: type,
            autoHideDuration: 2500,
        });
    }

    validateResponse = (response, callback) => {
        if(response.error) {
            this.showSnackbar(response.error, 'error');
        } else {
            callback(response);
        }
    }

    render() {
        return (
            <SnackbarContext.Provider value={this.showSnackbar}>
                <ResponseContext.Provider value={this.validateResponse}>
                    <Root />
                </ResponseContext.Provider>
            </SnackbarContext.Provider>
        )
    }

}

export default withSnackbar(App);
