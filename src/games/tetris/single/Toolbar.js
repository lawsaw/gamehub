import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import withWidth, { isWidthDown, isWidthUp } from '@material-ui/core/withWidth';
import { IconButton, Button, Typography } from "@material-ui/core";
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import { Toolbar as ToolbarComponent } from '../components';
import { Score } from './';
import { startMoving, startNewGame, stopGame, stopMoving } from "../../../actions/tetris";
import { Opponent } from '../opponent';

class Toolbar extends PureComponent {

    handleStart = (e) => {
        e.currentTarget.blur();
        const { startNewGame, startMoving } = this.props;
        startNewGame();
        startMoving();
    }

    render() {
        const { isGameRunning, isPlayButton, isPauseButton, speed, startMoving, stopMoving, stopGame, nickname, previewComponent, isOpponent, width } = this.props;
        let isTablet = isWidthDown('sm', width);
        let isMobile = isWidthDown('xs', width);
        let col_size = isMobile ? 5 : 15;
        return (
            <ToolbarComponent
                data={[

                    nickname && (
                        <Typography
                            variant='h6'
                        >
                            {nickname}
                        </Typography>
                    ),

                    <Score />,

                    <Fragment>
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

                    previewComponent,

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
                    ),

                    isOpponent && isTablet && (
                        <Opponent size={col_size} />
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
            isOpponent: opponent !== null,
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
)(withWidth()(Toolbar));
