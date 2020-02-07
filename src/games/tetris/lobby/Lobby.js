import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles, Box } from "@material-ui/core";
import { Nickname, TypeSelecting, Connection } from './';
import { socketUpdateUser } from "../../../socket/helper";
import { GAME_TETRIS } from "../../../helpers/constants";
import { LOBBY_STEP_NICKNAME, LOBBY_STEP_TYPE_SELECTING, LOBBY_STEP_CONNECTION } from "../helpers/constants";

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

    componentDidMount() {
        const { socketUpdateUser } = this.props;
        socketUpdateUser({
           game: GAME_TETRIS,
        });
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
    },
    dispatch => {
      return {
          socketUpdateUser: data => dispatch( socketUpdateUser(data) ),
      }
    }
)(withStyles(styles)(Lobby));