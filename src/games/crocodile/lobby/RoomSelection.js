import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Paper, IconButton, Box, List, ListItem, ListItemText, Divider, Grid, Typography, Container } from "@material-ui/core";
import { Add, ArrowBack } from '@material-ui/icons';
import { socketJoinRoom } from '../../../socket/crocodile';

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

    handleNewRoomModalOpen = () => {
        this.setState(() => ({
            isNewRoomModal: true,
        }));
    }

    handleJoinRoom = (room_name) => {
        const { socketJoinRoom } = this.props;
        socketJoinRoom(room_name);
    }
    
    render() {
        const { classes, rooms, onBackToNickname } = this.props;
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
            </Container>
        )
    }
}

export default connect(
    store => {
        return {
            rooms: store.crocodile.rooms,
        }
    },
    dispatch => {
        return {
            socketJoinRoom: room => dispatch( socketJoinRoom(room) ),
        }
    }
)(withStyles(styles)(RoomSelection));