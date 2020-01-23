import React, { PureComponent, Fragment } from 'react';
import { withStyles, Paper, IconButton, Box, List, ListItem, ListItemText, Divider, Grid, Dialog, Typography, Container } from "@material-ui/core";
import { Add, ArrowBack } from '@material-ui/icons';
import { TextInput } from '../../../components';
import { SOCKET_ON_ROOM_LIST, SOCKET_ON_ROOM_ADD, SOCKET_ON_ROOM_JOIN } from '../helpers/constants';
import { preventMultipleSubmit } from "../helpers/etc";
import SocketContext from '../../../helpers/SocketContext';

const styles = theme => ({
    root: {

    },
    input: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    iconButton: {
        padding: 20,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    stepTitle: {
        //fontSize: theme.typography.pxToRem(30),
        margin: '20px 0',
    },
    list: {
        maxWidth: 350,
        width: '100%',
    },
    listArea: {
        flexGrow: 1,
    },
    listItemText: {
        marginRight: theme.spacing(2),
    },
});
class RoomSelection extends PureComponent {

    constructor(props) {
        super(props);
        this.handleNewRoomSubmitDecorator = preventMultipleSubmit();
        this.state = {
            new_room_name: '',
            isNewRoomModal: false,
            rooms: null,
        }
    }

    componentDidMount() {
        const socket = this.context;
        socket.on(SOCKET_ON_ROOM_LIST, this.updateRoomList);
        this.getRoomList();
    }

    componentWillUnmount() {
        const socket = this.context;
        socket.off(SOCKET_ON_ROOM_LIST, this.updateRoomList);
    }

    getRoomList = () => {
        const socket = this.context;
        socket.emit(SOCKET_ON_ROOM_LIST);
    }

    updateRoomList = ({ rooms }) => {
        this.setState(() => ({
            rooms,
            isNewRoomModal: false,
            new_room_name: '',
        }));
    }
    
    handleNewRoomModalOpen = () => {
        this.setState(() => ({
            isNewRoomModal: true,
        }));
    }

    handleNewRoomModalClose = () => {
        this.setState(() => ({
            isNewRoomModal: false,
            new_room_name: '',
        }));
    }

    handleNewRoomChange = (e) => {
        const { value } = e.target;
        this.setState(() => ({
            new_room_name: value,
        }));
    }

    handleNewRoomSubmit = () => {
        const { new_room_name } = this.state;
        this.handleNewRoomSubmitDecorator(() => this.submitNewRoom(new_room_name));
    }

    submitNewRoom = (room) => {
        const socket = this.context;
        socket.emit(SOCKET_ON_ROOM_ADD, { room });
    }


    handleJoinRoom = (room_name) => {
        const socket = this.context;
        socket.emit(SOCKET_ON_ROOM_JOIN, { room: room_name });
    }
    
    render() {
        const { classes, onBackToNickname } = this.props;
        const { rooms, new_room_name, isNewRoomModal } = this.state;
        return (
            <Container>
                <Typography
                    className={classes.stepTitle}
                    variant="h6"
                >
                    Select room or create new one:
                </Typography>
                <Grid
                    container
                >
                    <Grid
                        item
                    >
                        <IconButton
                            className={classes.iconButton}
                            onClick={onBackToNickname}
                        >
                            <ArrowBack />
                        </IconButton>
                        <IconButton
                            className={classes.iconButton}
                            onClick={this.handleNewRoomModalOpen}
                            disabled
                        >
                            <Add />
                        </IconButton>
                    </Grid>
                    <Grid
                        item
                        className={classes.listArea}
                    >
                        <Paper
                            square={true}
                        >
                            <List component="nav" className={classes.list}>
                                {
                                    rooms && rooms.length ? rooms.map(({ room, players }, index) => {
                                        return (
                                            <Fragment
                                                key={room}
                                            >
                                                <ListItem
                                                    button
                                                    onClick={() => this.handleJoinRoom(room)}
                                                >
                                                    <ListItemText
                                                        primary={room}
                                                        className={classes.listItemText}
                                                    />
                                                    <Box>({players})</Box>
                                                </ListItem>
                                                {
                                                    index !== (rooms.length - 1) ? <Divider /> : null
                                                }
                                            </Fragment>
                                        )
                                    }) : 'No rooms found'
                                }
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
                <Dialog
                    open={isNewRoomModal}
                    onClose={this.handleNewRoomModalClose}
                >
                    <TextInput
                        onChange={this.handleNewRoomChange}
                        onSubmit={this.handleNewRoomSubmit}
                        placeholder="Enter new room name"
                        value={new_room_name}
                    />
                </Dialog>
            </Container>
        )
    }
}

RoomSelection.contextType = SocketContext;

export default withStyles(styles)(RoomSelection);