import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles, Box } from "@material-ui/core";
import { GamePainter, GameWatcher } from "./";
import { cleanRoom } from '../../../actions/crocodile';
import { setApp } from '../../../actions/app';
import { socketLeaveRoom } from '../../../socket/crocodile';

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

    constructor(props) {
        super(props);
        this.is_left = false;
    }

    componentDidMount() {
        const { setApp, roomName } = this.props;
        setApp({
            sub_header: roomName,
            topAction: this.handleLeaveRoom,
        });
    }

    componentWillUnmount() {
        this.handleLeaveRoom();
    }

    handleLeaveRoom = () => {
        if(this.is_left) return false;
        const { setApp, cleanRoom, socketLeaveRoom } = this.props;
        socketLeaveRoom();
        cleanRoom();
        setApp({
            sub_header: null,
            topAction: null,
            status: null,
        });
        this.is_left = true;
    }

    render() {
        const { classes, isPainter } = this.props;
        return (
            <Box className={classes.interface}>
                <Interface
                    isPainter={isPainter}
                    {...this.props}
                />
            </Box>
        )
    }
}

export default connect(
    store => {
        return {
            sub_header: store.app.sub_header,
            isPainter: (store.crocodile.room.painter || {}).id === store.socket.id,
            roomName: store.crocodile.room.roomName,
        }
    },
    dispatch => {
        return {
            cleanRoom: () => { dispatch(cleanRoom()) },
            setApp: options => { dispatch(setApp(options)) },
            socketLeaveRoom: () => { dispatch(socketLeaveRoom()) },
        }
    }
)(withStyles(styles)(GameInterface));