import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { SOCKET_ON_ROOM_JOIN, SOCKET_ON_ROOM_LEAVE } from './helpers/constants';
import { Lobby } from './lobby';
import { GameInterface } from './game';
import SocketContext from '../../helpers/SocketContext';

class Root extends PureComponent {

    state = {
        is_lobby: true,
    };

    componentDidMount() {
        const socket = this.context;
        socket.on(SOCKET_ON_ROOM_JOIN,  this.socketOnRoomJoin);
        socket.on(SOCKET_ON_ROOM_LEAVE, this.socketOnRoomLeave);
    }

    componentWillUnmount() {
        const socket = this.context;
        socket.off(SOCKET_ON_ROOM_JOIN,  this.socketOnRoomJoin);
        socket.off(SOCKET_ON_ROOM_LEAVE, this.socketOnRoomLeave);
    }

    socketOnRoomJoin = () => {
        this.setState(() => ({
            is_lobby: false,
        }));
    }

    socketOnRoomLeave = () => {
        this.setState(() => ({
            is_lobby: true,
        }));
    }

    render() {
        const { isConnected } = this.props;
        const { is_lobby } = this.state;
        return isConnected ? (
            <Fragment>
                {
                    is_lobby ? <Lobby /> : <GameInterface />
                }
            </Fragment>
        ) : (
            <Fragment>
                no connect
            </Fragment>
        )
    }

}

Root.contextType = SocketContext;

export default connect(
    store => {
        return {
            isConnected: store.socket.isConnected,
        }
    }
)(Root);