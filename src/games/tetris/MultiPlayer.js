import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Arena } from './';
import { Lobby } from './lobby';
import { resetConfig, stopGame } from '../../actions/tetris';
import { setApp } from "../../actions/app";
import { socketDisconnect } from "../../socket/tetris";

class MultiPlayer extends PureComponent {

    componentDidMount() {
        const { setApp } = this.props;
        setApp({

        });
    }

    componentWillUnmount() {
        const { resetConfig, is_lobby, socketDisconnect, stopGame } = this.props;
        if(!is_lobby) {
            console.log('make disconnect');
            stopGame();
            socketDisconnect();
        }
        resetConfig();
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

export default connect(
    store => {
        return {
            isConnected: store.socket.isConnected,
            is_lobby: store.tetris.opponent === null,
        }
    },
    dispatch => {
        return {
            resetConfig: () => dispatch( resetConfig() ),
            setApp: options => dispatch( setApp(options) ),
            stopGame: () => dispatch( stopGame() ),
            socketDisconnect: () => dispatch( socketDisconnect() ),
        }
    }
)(MultiPlayer);
