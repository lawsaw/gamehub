import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles, Box } from "@material-ui/core";
import { Nickname, TypeSelecting, Connection } from './';

const LOBBY_STEP_NICKNAME = 'LOBBY_STEP_NICKNAME';
const LOBBY_STEP_TYPE_SELECTING = 'LOBBY_STEP_TYPE_SELECTING';
const LOBBY_STEP_CONNECTION = 'LOBBY_STEP_CONNECTION';

const styles = () => ({
    lobby: {
        position: 'relative',
    },
});

class Lobby extends PureComponent {

    constructor(props) {
        super(props);
        this.steps = {
            [LOBBY_STEP_NICKNAME]: <Nickname />,
            [LOBBY_STEP_TYPE_SELECTING]: <TypeSelecting />,
            [LOBBY_STEP_CONNECTION]: <Connection />,
        };
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
            step: store.tetris.config.step,
        }
    }
)(withStyles(styles)(Lobby));