import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles, Box } from "@material-ui/core";
import { GamePainter, GameWatcher } from "./";
import { SOCKET_ON_ROOM, SOCKET_ON_ROOM_LEAVE } from '../helpers/constants';
import { updateRoom, cleanRoom } from '../../../actions/crocodile';
import { setApp } from '../../../actions/app';
import SocketContext from '../../../helpers/SocketContext';

const styles = () => ({
    interface: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
});

const Interface = ({ classes, ...props }) => {
    return props.isPainter ? <GamePainter {...props} /> : <GameWatcher {...props} />
};

class GameInterface extends PureComponent {

    componentDidMount() {
        const socket = this.context;
        const { setApp } = this.props;
        socket.on(SOCKET_ON_ROOM, this.updateRoom);
        this.requestRoomData();
        setApp({
            topAction: this.handleLeaveRoom,
        });
    }

    componentWillUnmount() {
        const socket = this.context;
        this.handleLeaveRoom();
        socket.off(SOCKET_ON_ROOM, this.updateRoom);
    }

    handleLeaveRoom = () => {
        const socket = this.context;
        const { setApp, cleanRoom } = this.props;
        socket.emitCrocodile(SOCKET_ON_ROOM_LEAVE);
        cleanRoom();
        setApp({
            topAction: null,
        });
    }

    updateRoom = ({ room }) => {
        const { updateRoom } = this.props;
        updateRoom(room);
    }

    requestRoomData = () => {
        const socket = this.context;
        socket.emitCrocodile(SOCKET_ON_ROOM);
    }

    // getPlayer = () => {
    //     const { socket: { id }, room } = this.props;
    //     let player = (room && room.players && room.players[id]) || {};
    //     player['id'] = id;
    //     return player;
    // }

    render() {
        const { classes, isRoom, isPainter } = this.props;
        return isRoom ? (
            <Box className={classes.interface}>
                <Interface
                    isPainter={isPainter}
                    {...this.props}
                />
            </Box>
        ) : 'Room is loading'
    }
}

GameInterface.contextType = SocketContext;

export default connect(
    store => {
        return {
            isRoom: Object.keys(store.crocodile.room).length,
            isPainter: (store.crocodile.room.painter || {}).id === store.socket.id,
        }
    },
    dispatch => {
        return {
            updateRoom: room => {
                dispatch(updateRoom(room))
            },
            cleanRoom: () => {
                dispatch(cleanRoom())
            },
            setApp: status => {
                dispatch(setApp(status))
            }
            // cleanApp: () => {
            //     dispatch(cleanApp())
            // }
        }
    }
)(withStyles(styles)(GameInterface));