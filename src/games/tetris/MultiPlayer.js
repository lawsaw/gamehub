import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Arena } from './';
import { Lobby } from './lobby';
import { resetConfig } from '../../actions/tetris';
import { setApp } from "../../actions/app";

class MultiPlayer extends PureComponent {

    componentDidMount() {
        const { setApp } = this.props;
        setApp({

        });
    }

    componentWillUnmount() {
        const { resetConfig } = this.props;
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
        }
    }
)(MultiPlayer);
