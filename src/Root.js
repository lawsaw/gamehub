import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles, Grid } from "@material-ui/core";
import { Header, Footer } from './containers';
import { ROUTES } from './helpers/routes';
import { socketConnect, socketDisconnect } from './actions/socket';
import { listenConnect, listenDisconnect, listenMessage } from "./socket/common_listen";

const styles = () => ({
    layout: {
        backgroundColor: '#191922',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    header: {
        backgroundColor: '#121216',
    },
    body: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    footer: {
        backgroundColor: '#121216',
        //height: 25,
    },
});

class Root extends PureComponent {

    componentDidMount() {
        const { startListenConnect, startListenDisconnect, startListenMessage } = this.props;
        startListenConnect(this.socketOnConnect);
        startListenDisconnect(this.socketOnDisconnect);
        startListenMessage(this.socketOnMessage);
    }

    componentWillUnmount() {
        const { stopListenConnect, stopListenDisconnect, stopListenMessage } = this.props;
        stopListenConnect(this.socketOnConnect);
        stopListenDisconnect(this.socketOnDisconnect);
        stopListenMessage(this.socketOnMessage);
    }

    socketOnConnect = () => {
        const socket = this.context;
        const { socketConnect } = this.props;
        socketConnect(socket.id);
    }

    socketOnDisconnect = () => {
        const socket = this.context;
        const { socketDisconnect } = this.props;
        socketDisconnect(socket.id);
    }

    socketOnMessage = ({ message_type, message }) => {
        const { enqueueSnackbar } = this.props;
        enqueueSnackbar(message, {
            variant: message_type,
            autoHideDuration: 1500,
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Router>
                <Grid
                    container
                    direction="column"
                    alignItems="stretch"
                    justify="space-between"
                    className={classes.layout}
                >
                    <Grid
                        item
                        className={classes.header}
                    >
                        <Route
                            component={props => <Header {...props} />}
                        />
                    </Grid>
                    <Grid
                        item
                        className={classes.body}
                    >
                        <Switch>
                            {
                                ROUTES.map(({ link, label, page }, index) => (
                                    <Route
                                        key={index}
                                        exact
                                        path={link}
                                        component={page}
                                    />
                                ))
                            }
                        </Switch>
                    </Grid>
                    <Grid
                        item
                        className={classes.footer}
                    >
                        <Footer />
                    </Grid>
                </Grid>
            </Router>
        )
    }

}

export default connect(
    null,
    dispatch => {
        return {
            socketConnect: id => dispatch(socketConnect(id)),
            socketDisconnect: id => dispatch(socketDisconnect(id)),
            startListenConnect: callback => dispatch(listenConnect(true, callback)),
            stopListenConnect: callback => dispatch(listenConnect(false, callback)),
            startListenDisconnect: callback => dispatch(listenDisconnect(true, callback)),
            stopListenDisconnect: callback => dispatch(listenDisconnect(false, callback)),
            startListenMessage: callback => dispatch(listenMessage(true, callback)),
            stopListenMessage: callback => dispatch(listenMessage(false, callback)),
        }
    }
)(withSnackbar(withStyles(styles)(Root)));
