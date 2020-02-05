import React, { PureComponent, Fragment } from 'react';
import { withStyles } from "@material-ui/core";
import { connect } from 'react-redux';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Toolbar as ToolbarComponent, Fab, Nickname } from '../components';
import { Score } from './';
import { startMoving, startNewGame, stopGame, stopMoving, startNewGameAndMove } from "../../../actions/tetris";
import { Opponent } from '../opponent';
import { ROWS, ROWS_HIDDEN } from "../helpers/constants";
import { setApp } from "../../../actions/app";
import { socketSendButtonAction, socketGameReset } from "../../../socket/tetris";
import ResponseContext from '../../../helpers/ResponseContext';

const OPPONENT_COL_SIZE = {
    'MIN': 10,
    'MAX': 17,
};

const styles = theme => ({
    button: {
        '&:not(:first-child)': {
            marginLeft: theme.spacing(1),
        }
    },
    label: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.7rem',
        },
    },
    labelOpponent: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.7rem',
        },
    },
    labelSingle: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.8rem',
        }
    },
    toolbarOpponent: {
        [theme.breakpoints.down('xs')]: {
            position: 'absolute',
            bottom: (ROWS - ROWS_HIDDEN) * OPPONENT_COL_SIZE.MIN - (ROWS - ROWS_HIDDEN - 2),
            left: 0,
            padding: 0,
            height: 'auto',
        },
    }
});

class Toolbar extends PureComponent {

    componentDidMount() {
        const { setApp } = this.props;
        setApp({
            topComponent: this.renderPlayPauseButtons(),
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { setApp, isGameRunning, isPlayButton, isPauseButton } = this.props;
        if(isGameRunning !== prevProps.isGameRunning || isPlayButton !== prevProps.isPlayButton || isPauseButton !== prevProps.isPauseButton) {
            setApp({
                topComponent: this.renderPlayPauseButtons(),
            })
        }
    }

    componentWillUnmount() {
        const { setApp } = this.props;
        setApp({
            topComponent: null,
        })
    }

    handleAction = async (action) => {
        const validateResponse = this.context;
        const { isOpponent, socketSendButtonAction } = this.props;
        let doAction = () => action in this.props && this.props[action]();
        if(!isOpponent) doAction();
        else {
            let response = await socketSendButtonAction(action);
            validateResponse(response, doAction);
        }
    }

    handleStart = (e) => {
        e.currentTarget.blur();
        this.handleAction('startNewGameAndMove');
    }

    handleStartMoving = () => {
        this.handleAction('startMoving');
    }

    handleStopMoving = () => {
        this.handleAction('stopMoving');
    }

    handleStopGame = () => {
        const action = this.props.isOpponent ? 'socketGameReset' : 'stopGame';
        this.handleAction(action);
    }

    renderPlayPauseButtons = () => {
        const { classes, isGameRunning, isPlayButton, isPauseButton } = this.props;
        let button_size = 'small';
        return (
            <Fragment>
                {
                    isGameRunning ? (
                        <Fragment>
                            <Fab
                                icon="Stop"
                                size={button_size}
                                onClick={this.handleStopGame}
                                className={classes.button}
                            />
                            {
                                isPlayButton && (
                                    <Fab
                                        icon="PlayArrow"
                                        size={button_size}
                                        onClick={this.handleStartMoving}
                                        className={classes.button}
                                    />
                                )
                            }
                            {
                                isPauseButton && (
                                    <Fab
                                        icon="Pause"
                                        size={button_size}
                                        onClick={this.handleStopMoving}
                                        className={classes.button}
                                    />
                                )
                            }
                        </Fragment>
                    ) : (
                        <Fab
                            icon="PlayArrow"
                            size={button_size}
                            onClick={this.handleStart}
                        />
                    )
                }
            </Fragment>
        )
    }

    render() {
        const { classes, nickname, previewComponent, isOpponent, width } = this.props;
        let is_tablet = isWidthDown('sm', width);
        let is_mobile = isWidthDown('xs', width);
        let col_size_opponent = is_mobile ? OPPONENT_COL_SIZE.MIN : OPPONENT_COL_SIZE.MAX;
        return (
            <ToolbarComponent
                data={[

                    nickname && (
                        <Nickname
                            name={nickname}
                            className={isOpponent ? classes.label : classes.labelSingle}
                        />
                    ),

                    <Score
                        className={isOpponent ? classes.label : classes.labelSingle}
                    />,

                    previewComponent,

                    isOpponent && is_tablet && (
                        <Opponent size={col_size_opponent} labelClassName={classes.labelOpponent} toolbarClassName={classes.toolbarOpponent} />
                    )

                ]}
            />

        )
    }

}

Toolbar.contextType = ResponseContext;

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
            startNewGameAndMove: () => { dispatch(startNewGameAndMove()) },
            setApp: options => dispatch( setApp(options) ),
            socketSendButtonAction: button_action => dispatch( socketSendButtonAction(button_action) ),
            socketGameReset: () => dispatch( socketGameReset() ),
        }
    }
)(withWidth()(withStyles(styles)(Toolbar)));
