import React, { PureComponent } from 'react';
import { withStyles, Box } from "@material-ui/core";
import { Nickname, RoomSelection } from './';
import { SOCKET_ON_LOBBY_STEP_CHANGE, LOBBY_STEP_NICKNAME, LOBBY_STEP_ROOM_SELECTION } from '../helpers/constants';
import SocketContext from '../../../helpers/SocketContext';

const styles = () => ({
    lobby: {
        position: 'relative',
    },
    lobbyContent: {
        position: 'relative',
    },
});

class Lobby extends PureComponent {

    constructor(props) {
        super(props);
        this.steps = {
            [LOBBY_STEP_NICKNAME]: () => <Nickname />,
            [LOBBY_STEP_ROOM_SELECTION]: () => <RoomSelection onBackToNickname={this.handleBackToNickname} />,
        };
        this.state = {
            step: LOBBY_STEP_NICKNAME,
        };
    }

    componentDidMount() {
        const socket = this.context;
        socket.on(SOCKET_ON_LOBBY_STEP_CHANGE, this.onStepChange);
    }

    componentWillUnmount() {
        const socket = this.context;
        socket.off(SOCKET_ON_LOBBY_STEP_CHANGE, this.onStepChange);
    }

    onStepChange = ({ step }) => {
        this.setStep(step);
    }

    setStep = (step) => {
        this.setState(() => ({
            step,
        }));
    }

    handleBackToNickname = () => {
        this.setStep(LOBBY_STEP_NICKNAME);
    }

    render() {
        const { classes } = this.props;
        const { step } = this.state;
        return (
            <Box
                className={classes.lobby}
            >
                {
                    this.steps[step]()
                }
            </Box>
        )
    }
}

Lobby.contextType = SocketContext;

export default withStyles(styles)(Lobby);