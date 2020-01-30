import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { IconButton, Button, Typography } from "@material-ui/core";
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import { Toolbar as ToolbarComponent } from '../components';
import { Score, Preview } from './';
import { startMoving, startNewGame, stopGame, stopMoving } from "../../../actions/tetris";

class Toolbar extends PureComponent {

    handleStart = (e) => {
        e.currentTarget.blur();
        const { startNewGame, startMoving } = this.props;
        startNewGame();
        startMoving();
    }

    render() {
        const { isGameRunning, isPlayButton, isPauseButton, speed, startMoving, stopMoving, stopGame, nickname } = this.props;
        return (
            <ToolbarComponent
                data={[

                    nickname && (
                        <Typography
                            variant='h5'
                        >
                            {nickname}
                        </Typography>
                    ),

                    <Fragment>
                        <Score />
                        Speed: {speed}
                    </Fragment>,

                    isGameRunning ? (
                        <Button
                            variant="outlined"
                            onClick={stopGame}
                        >
                            Stop
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            onClick={this.handleStart}
                        >
                            Start
                        </Button>
                    ),

                    <Preview />,

                    isPlayButton && (
                        <IconButton
                            variant="outlined"
                            onClick={startMoving}
                            size="medium"
                        >
                            <PlayArrow />
                        </IconButton>
                    ),

                    isPauseButton && (
                        <IconButton
                            variant="outlined"
                            onClick={stopMoving}
                            size="medium"
                        >
                            <Pause />
                        </IconButton>
                    )

                ]}
            />

        )
    }

}

export default connect(
    store => {
        const { isGameRunning, isPause, speed, opponent, config } = store.tetris;
        return {
            isGameRunning,
            speed,
            isPlayButton:  isGameRunning && isPause,
            isPauseButton:  isGameRunning && !isPause,
            nickname: opponent !== null && config.nickname,
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
)(Toolbar);
