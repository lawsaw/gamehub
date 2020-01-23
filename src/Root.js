import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles, Grid } from "@material-ui/core";
import { Header, Footer } from './containers';
import { ROUTES } from './helpers/routes';
import { SOCKET_MESSAGE } from "./helpers/constants";
import SocketContext from './helpers/SocketContext';
import { socketConnect, socketDisconnect } from './actions/socket';

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
        const socket = this.context;
        socket.on('connect',        this.socketOnConnect);
        socket.on('disconnect',     this.socketOnDisconnect);
        socket.on(SOCKET_MESSAGE,   this.socketOnMessage);
    }

    // componentWillUnmount() {
    //     const socket = this.context;
    //     socket.off(SOCKET_MESSAGE,   this.socketOnMessage);
    //     socket.off('connect',        this.socketOnConnect);
    //     socket.off('disconnect',     this.socketOnDisconnect);
    // }

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

Root.contextType = SocketContext;

export default connect(
    null,
    dispatch => {
        return {
            socketConnect: id => dispatch(socketConnect(id)),
            socketDisconnect: id => dispatch(socketDisconnect(id)),
        }
    }
)(withSnackbar(withStyles(styles)(Root)));
