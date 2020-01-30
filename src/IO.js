import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { socketConnect, socketDisconnect } from './actions/socket';
import SocketContext from './helpers/SocketContext';
import { updateConfig, updateOpponent } from "./actions/tetris";

class Root extends PureComponent {

    constructor(props) {
        super(props);
        this.listen_map = {
            'COMMON': {
                'SOCKET_MESSAGE': this.socketOnMessage,
            },
            'GAME_TETRIS': {
                'LOBBY_UPDATE_CONFIG': props.updateConfig,
                'ON_GAME': props.updateOpponent,
            }
        };
    }

    componentDidMount() {
        const IO = this.context;
        IO.on('connect', this.socketOnConnect);
        IO.on('disconnect', this.socketOnDisconnect);
        IO.on('SOCKET_CLIENT', this.handleSocket);
    }

    componentWillUnmount() {
        const IO = this.context;
        IO.off('connect', this.socketOnConnect);
        IO.off('disconnect', this.socketOnDisconnect);
        IO.off('SOCKET_CLIENT', this.handleSocket);
    }

    handleSocket = (props) => {
        console.log({
            socketReceive: props,
        });
        const { target, action, args } = props;
        if(target in this.listen_map && action in this.listen_map[target]) this.listen_map[target][action](args);
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
        return null;
    }

}

Root.contextType = SocketContext;

export default connect(
    null,
    dispatch => {
        return {
            socketConnect: id => dispatch( socketConnect(id) ),
            socketDisconnect: id => dispatch( socketDisconnect(id) ),
            updateConfig: config => dispatch( updateConfig(config) ),
            updateOpponent: opponent => dispatch( updateOpponent(opponent) ),
        }
    }
)(withSnackbar(Root));
