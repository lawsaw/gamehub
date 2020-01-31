import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles, Box } from "@material-ui/core";
import { Nickname, RoomSelection } from './';
import { LOBBY_STEP_NICKNAME, LOBBY_STEP_ROOM_SELECTION } from '../helpers/constants';
import { updateConfig } from "../../../actions/crocodile";

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
            [LOBBY_STEP_NICKNAME]: <Nickname />,
            [LOBBY_STEP_ROOM_SELECTION]: <RoomSelection onBackToNickname={this.handleBackToNickname} />,
        };
    }

    handleBackToNickname = () => {
        const { updateConfig } = this.props;
        updateConfig({
            step: LOBBY_STEP_NICKNAME
        })
    }

    render() {
        const { classes, step } = this.props;
        return (
            <Box
                className={classes.lobby}
            >
                {
                    step in this.steps ? this.steps[step] : step
                }
            </Box>
        )
    }
}

export default connect(
    store => {
        return {
            step: store.crocodile.config.step,
        }
    },
    dispatch => {
        return {
            updateConfig: config => dispatch( updateConfig(config) ),
        }
    }
)(withStyles(styles)(Lobby));