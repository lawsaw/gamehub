import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { socketConnect, socketDisconnect } from './actions/socket';
import SocketContext from './helpers/SocketContext';
import {updateConfig as updateConfigTetris, updateOpponent, startNewGame, startMoving, stopMoving, stopGame, resetConfig } from "./actions/tetris";
import { updateConfig as updateConfigCrocodile, updateRoomList, updateRoom } from "./actions/crocodile";
import { SOCKET_CHANNEL, COMMON_ACTIONS, GAME_TETRIS, GAME_CROCODILE } from "./helpers/constants";
import { socketMakeConnection } from "./socket/tetris";

class Root extends PureComponent {

    constructor(props) {
        super(props);
        this.listen_map = {
            [COMMON_ACTIONS]: {
                'SOCKET_MESSAGE': this.socketOnMessage,
            },
            [GAME_TETRIS]: {
                'LOBBY_UPDATE_CONFIG': props.updateConfigTetris,
                'ON_GAME': props.updateOpponent,
                'DO_BUTTON_ACTION': this.doTetrisActionButton,
                'DO_GAME_DISCONNECT': () => { props.stopGame(); props.resetConfig() },
            },
            [GAME_CROCODILE]: {
                'LOBBY_UPDATE_CONFIG': props.updateConfigCrocodile,
                'UPDATE_ROOM_LIST': props.updateRoomList,
                'UPDATE_ROOM': props.updateRoom,
            },
        };
    }

    doTetrisActionButton = ({ button_action }) => {
        console.log(button_action);
        const { opponentId } = this.props;
        console.log(opponentId);
        if(button_action in this.props) {
            switch(button_action) {
                case 'startNewGame':
                    this.props[button_action]();
                    this.props['startMoving']();
                    break;
                case 'stopGame':
                    this.props[button_action]();
                    this.props['socketMakeConnection'](opponentId);
                    break;
                default:
                    this.props[button_action]();
                    break;
            }
        }
    }

    componentDidMount() {
        const IO = this.context;
        IO.on('connect', this.socketOnConnect);
        IO.on('disconnect', this.socketOnDisconnect);
        IO.on(SOCKET_CHANNEL, this.handleSocket);
    }

    componentWillUnmount() {
        const IO = this.context;
        IO.off('connect', this.socketOnConnect);
        IO.off('disconnect', this.socketOnDisconnect);
        IO.off(SOCKET_CHANNEL, this.handleSocket);
    }

    handleSocket = (props) => {
        // console.log({
        //     socketReceive: props,
        // });
        const { target, action, args } = props;
        if(target in this.listen_map && action in this.listen_map[target]) {
            //console.log(`${target} - ${action}`);
            this.listen_map[target][action](args);
        }
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
    store => {
        return {
            opponentId: store.tetris.opponent && store.tetris.opponent.id,
        }
    },
    dispatch => {
        return {
            socketConnect: id => dispatch( socketConnect(id) ),
            socketDisconnect: id => dispatch( socketDisconnect(id) ),

            //Tetris
            updateConfigTetris: config => dispatch( updateConfigTetris(config) ),
            updateOpponent: opponent => dispatch( updateOpponent(opponent) ),
            resetConfig: () => dispatch( resetConfig() ),
            socketMakeConnection: server_id => dispatch( socketMakeConnection(server_id) ),

            //button_actions
            startNewGame: () => dispatch( startNewGame() ),
            startMoving: () => dispatch( startMoving() ),
            stopMoving: () => dispatch( stopMoving() ),
            stopGame: () => dispatch( stopGame() ),

            //Crocodile
            updateConfigCrocodile: config => dispatch( updateConfigCrocodile(config) ),
            updateRoomList: rooms => dispatch( updateRoomList(rooms) ),
            updateRoom: room => dispatch( updateRoom(room) ),
        }
    }
)(withSnackbar(Root));
