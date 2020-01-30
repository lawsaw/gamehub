import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Arena } from './';
import { Lobby } from './lobby';

class MultiPlayer extends PureComponent {

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
    // dispatch => {
    //     return {
    //
    //     }
    // }
)(MultiPlayer);
