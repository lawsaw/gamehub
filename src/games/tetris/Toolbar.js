import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles, IconButton, Button, Box } from "@material-ui/core";
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import { Toolbar as ToolbarComponent } from '../../components';
import { Score, Preview } from './';
import { startMoving, startNewGame, stopGame, stopMoving } from "../../actions/tetris";

const styles = theme => ({
    toolbar: {
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    item: {
        '&:not(:first-child)': {
            marginTop: theme.spacing(2),
            // [theme.breakpoints.up('sm')]: {
            //     marginTop: theme.spacing(3),
            // },
            // [theme.breakpoints.down('xs')]: {
            //
            // },
        },
    },
    score: {
        //flexGrow: 1,
    },
});

class Toolbar extends PureComponent {

    handleStart = (e) => {
        e.currentTarget.blur();
        const { startNewGame, startMoving } = this.props;
        startNewGame();
        startMoving();
    }


    render() {
        const { classes, isGameRunning, isPlayButton, isPauseButton, speed, startMoving, stopMoving, stopGame } = this.props;
        return (
            <ToolbarComponent
                className={classes.toolbar}
            >
                <Box
                    className={classes.item}
                >
                    <Score />
                    Speed: {speed}
                </Box>
                {
                    isGameRunning ? (
                        <Button
                            className={classes.item}
                            variant="outlined"
                            onClick={stopGame}
                        >
                            Stop
                        </Button>
                    ) : (
                        <Button
                            className={classes.item}
                            variant="outlined"
                            onClick={this.handleStart}
                        >
                            Start
                        </Button>
                    )
                }
                <Box
                    className={classes.item}
                >
                    <Preview />
                </Box>
                {
                    isPlayButton && (
                        <IconButton
                            className={classes.item}
                            variant="outlined"
                            onClick={startMoving}
                            size="medium"
                        >
                            <PlayArrow/>
                        </IconButton>
                    )
                }
                {
                    isPauseButton && (
                        <IconButton
                            className={classes.item}
                            variant="outlined"
                            onClick={stopMoving}
                            size="medium"
                        >
                            <Pause />
                        </IconButton>
                    )
                }

            </ToolbarComponent>
        )
    }

}

export default connect(
    store => {
        const { isGameRunning, isPause, speed } = store.tetris;
        return {
            isGameRunning,
            speed,
            isPlayButton:  isGameRunning && isPause,
            isPauseButton:  isGameRunning && !isPause,
        }
    },
    dispatch => {
        return {
            startNewGame: () => { dispatch(startNewGame()) },
            stopGame: () => { dispatch(stopGame()) },
            startMoving: () => { dispatch(startMoving()) },
            stopMoving: () => { dispatch(stopMoving()) },
        }
    }
)(withStyles(styles)(Toolbar));
