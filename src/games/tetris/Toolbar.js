import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles, IconButton, Button } from "@material-ui/core";
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import { Toolbar as ToolbarComponent } from '../../components';
import { Score } from './';
import { startMoving, startNewGame, stopMoving } from "../../actions/tetris";

const styles = () => ({
    toolbar: {
        flexWrap: 'wrap',
    },
    score: {
        flexGrow: 1,
    },
});


class Toolbar extends PureComponent {

    handleStart = () => {
        const { startNewGame, startMoving } = this.props;
        console.log('handleStart');
        startNewGame();
        startMoving();
    }

    render() {
        const { classes, isGameRunning, isPause, startMoving, stopMoving } = this.props;
        return (
            <ToolbarComponent
                className={classes.toolbar}
            >
                <Score
                    className={classes.score}
                />
                <Button
                    onClick={this.handleStart}
                >
                    Start
                </Button>
                {
                    isGameRunning ? isPause ? (
                        <IconButton
                            onClick={startMoving}
                            size="small"
                        >
                            <PlayArrow />
                        </IconButton>
                    ) : (
                        <IconButton
                            onClick={stopMoving}
                            size="small"
                        >
                            <Pause />
                        </IconButton>
                    ) : null
                }

            </ToolbarComponent>
        )
    }

}

export default connect(
    store => {
        return {
            isPause: store.tetris.isPause,
            isGameRunning: store.tetris.isGameRunning,
        }
    },
    dispatch => {
        return {
            startNewGame: () => { dispatch(startNewGame()) },
            startMoving: () => { dispatch(startMoving()) },
            stopMoving: () => { dispatch(stopMoving()) },
        }
    }
)(withStyles(styles)(Toolbar));
