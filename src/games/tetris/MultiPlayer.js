import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Arena } from './';
import { Lobby } from './lobby';
import { resetConfig } from '../../actions/tetris';

class MultiPlayer extends PureComponent {

    componentWillUnmount() {
        const { resetConfig } = this.props;
        resetConfig();
    }

    render() {
        const { isConnected, is_lobby } = this.props;
        return isConnected ? (
            <Fragment>
                {
                    is_lobby ? <Lobby /> : <Arena isOpponent={true} />
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
        }
    }
)(MultiPlayer);
