import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core";
import SocketContext from '../../helpers/SocketContext';
import { Lobby, Arena } from './';
import { SOCKET_ON_ARENA, SOCKET_ON_GAME_INIT, SOCKET_ON_GAME_EXIT } from './helpers/constants';
import { initOpponent } from "../../actions/tetris";
import { listenGame } from '../../socket/tetris_listen';

const styles = theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
});

class MultiPlayer extends PureComponent {

    componentDidMount() {
        const socket = this.context;
        const { isConnected, startListenGame } = this.props;
        console.log(isConnected);
        startListenGame(this.handleGame);
        // socket.on(SOCKET_ON_GAME_INIT, this.handleGameInit);
        // socket.on(SOCKET_ON_GAME_EXIT, this.handleGameExit);
    }

    componentWillUnmount() {
        const socket = this.context;
        const { stopListenGame } = this.props;
        stopListenGame(this.handleGame);
        // socket.off(SOCKET_ON_GAME_INIT, this.handleGameInit);
        // socket.off(SOCKET_ON_GAME_EXIT, this.handleGameExit);
    }

    handleGame = (opponent_data) => {
        const { initOpponent } = this.props;
        console.log(opponent_data);
        initOpponent(opponent_data);
    }

    // handleGameInit = ({ opponent }) => {
    //     const { initOpponent } = this.props;
    //     console.log(opponent);
    //     initOpponent({
    //         opponent,
    //     });
    // }

    handleGameExit = () => {
       console.log('handleGameExit');
    }

    render() {
        const { isConnected, is_lobby } = this.props;
        return isConnected ? (
            <Fragment>
                {
                    is_lobby ? <Lobby /> : <Arena />
                }
            </Fragment>
        ) : (
            <Fragment>
                no connected
            </Fragment>
        )
    }

}

MultiPlayer.contextType = SocketContext;

export default connect(
    store => {
        return {
            isConnected: store.socket.isConnected,
            is_lobby: store.tetris.opponent === null,
        }
    },
    dispatch => {
        return {
            initOpponent: opponent => { dispatch(initOpponent(opponent)) },
            startListenGame: callback => { dispatch(listenGame(true, callback)) },
            stopListenGame: callback => { dispatch(listenGame(false, callback)) },
        }
    }
)(withStyles(styles)(MultiPlayer));
