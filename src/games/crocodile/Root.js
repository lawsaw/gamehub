import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Lobby } from './lobby';
import { GameInterface } from './game';
import { resetConfig } from "../../actions/crocodile";

class Root extends PureComponent {

    componentWillUnmount() {
        const { resetConfig } = this.props;
        resetConfig();
    }

    render() {
        const { isConnected, isRoomDefined } = this.props;
        return isConnected ? (
            <Fragment>
                {
                    !isRoomDefined ? <Lobby /> : <GameInterface />
                }
            </Fragment>
        ) : (
            <Fragment>
                no connect
            </Fragment>
        )
    }

}

export default connect(
    store => {
        return {
            isConnected: store.socket.isConnected,
            isRoomDefined: store.crocodile.room.status,
        }
    },
    dispatch => {
        return {
            resetConfig: () => dispatch( resetConfig() ),
        }
    }
)(Root);