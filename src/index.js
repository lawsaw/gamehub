import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import theme from './helpers/theme';
import App from './App';

class Comp extends PureComponent {
    render() {
        return (
            <Router>
                <MuiThemeProvider theme={theme}>
                    <SnackbarProvider maxSnack={3} anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <CssBaseline />
                        <Route component={App} />
                    </SnackbarProvider>
                </MuiThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(<Comp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
