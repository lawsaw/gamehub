import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import withWidth, { isWidthDown, isWidthUp } from '@material-ui/core/withWidth';
import { IconButton, Button, Typography } from "@material-ui/core";
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Stop from '@material-ui/icons/Stop';
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
        const { isGameRunning, isPlayButton, isPauseButton, startMoving, stopMoving, stopGame, nickname, previewComponent, isOpponent, width } = this.props;
        let is_tablet = isWidthDown('sm', width);
        let is_mobile = isWidthDown('xs', width);
        let col_size = is_mobile ? 7 : 16;
        let button_size = is_tablet ? 'medium' : 'medium';
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

                    isGameRunning ? (
                        <Fragment>
                            <IconButton
                                variant="outlined"
                                onClick={stopGame}
                                size={button_size}
                            >
                                <Stop />
                            </IconButton>
                            {
                                isPlayButton && (
                                    <IconButton
                                        variant="outlined"
                                        onClick={startMoving}
                                        size={button_size}
                                    >
                                        <PlayArrow />
                                    </IconButton>
                                )
                            }
                            {
                                isPauseButton && (
                                    <IconButton
                                        variant="outlined"
                                        onClick={stopMoving}
                                        size={button_size}
                                    >
                                        <Pause />
                                    </IconButton>
                                )
                            }
                        </Fragment>
                    ) : (
                        <IconButton
                            variant="outlined"
                            onClick={this.handleStart}
                            size={button_size}
                        >
                            <PlayArrow />
                        </IconButton>
                    ),

                    previewComponent,

                    isOpponent && is_tablet && (
                        <Opponent size={col_size} />
                    )

                ]}
            />

        )
    }

}

export default connect(
    store => {
        const { isGameRunning, isPause, opponent, config } = store.tetris;
        return {
            isGameRunning,
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
