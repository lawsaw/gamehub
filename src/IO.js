import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { socketConnect, socketDisconnect } from './actions/socket';
import SocketContext from './helpers/SocketContext';
import { updateOpponent, startNewGame, startMoving, stopMoving, stopGame, resetConfig, showResults, startNewGameAndMove } from "./actions/tetris";
import { updateConfig as updateConfigCrocodile, updateRoomList, updateRoom } from "./actions/crocodile";
import { SOCKET_CHANNEL, COMMON_ACTIONS, GAME_TETRIS, GAME_CROCODILE } from "./helpers/constants";
import { socketGameReset, socketGameDisconnect } from "./socket/tetris";

class Root extends PureComponent {

    constructor(props) {
        super(props);
        this.listen_map = {
            [COMMON_ACTIONS]: {
                'SOCKET_MESSAGE': this.socketOnMessage,
            },
            [GAME_TETRIS]: {
                'ON_GAME': props.updateOpponent,
                'DO_BUTTON_ACTION': this.doTetrisActionButton,
                'DO_GAME_DISCONNECT': props.socketGameDisconnect,
                'DO_GAME_FINISH': this.doGameFinish,
            },
            [GAME_CROCODILE]: {
                'LOBBY_UPDATE_CONFIG': props.updateConfigCrocodile,
                'UPDATE_ROOM_LIST': props.updateRoomList,
                'UPDATE_ROOM': props.updateRoom,
            },
        };
    }

    doGameFinish = () => {
        const { isResultModalOpen, showResults } = this.props;
        if(!isResultModalOpen) showResults();
    }

    doTetrisActionButton = ({ button_action }) => {
        if(button_action && (button_action in this.props)) this.props[button_action]();
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
            isResultModalOpen: store.tetris.isResultModalOpen,
        }
    },
    dispatch => {
        return {
            //Store socket connection
            socketConnect: id => dispatch( socketConnect(id) ),
            socketDisconnect: id => dispatch( socketDisconnect(id) ),

            //Tetris
            updateOpponent: opponent => dispatch( updateOpponent(opponent) ),
            resetConfig: () => dispatch( resetConfig() ),
            showResults: () => dispatch( showResults() ),
            socketGameReset: () => dispatch( socketGameReset() ),
            socketGameDisconnect: () => dispatch( socketGameDisconnect() ),
                //button_actions
                startNewGame: () => dispatch( startNewGame() ),
                startMoving: () => dispatch( startMoving() ),
                stopMoving: () => dispatch( stopMoving() ),
                stopGame: () => dispatch( stopGame() ),
                startNewGameAndMove: () => dispatch( startNewGameAndMove() ),

            //Crocodile
            updateConfigCrocodile: config => dispatch( updateConfigCrocodile(config) ),
            updateRoomList: rooms => dispatch( updateRoomList(rooms) ),
            updateRoom: room => dispatch( updateRoom(room) ),
        }
    }
)(withSnackbar(Root));
