import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Box, Button, Dialog } from "@material-ui/core";
import { Paint, Game } from "./";
import { SOCKET_ON_WORD_SELECT, SOCKET_ON_PAINT } from '../helpers/constants';
import SocketContext from '../../../helpers/SocketContext';

const styles = (theme) => ({
    wordList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
    },
    wordButton: {
        width: '100%',
        '&:not(:first-child)': {
            marginTop: theme.spacing(1),
        }
    },
});

class GamePainter extends PureComponent {

    handleWordSelect = (e, word) => {
        const socket = this.context;
        socket.emitCrocodile(SOCKET_ON_WORD_SELECT, {
            word
        });
    }

    handleConvertToImage = (canvas) => {
        if(!canvas) return false;
        const socket = this.context;
        let image = canvas.current.toDataURL();
        socket.emitCrocodile(SOCKET_ON_PAINT, {
            image
        });
    }

    getTask = () => {
        const { word } = this.props;
        return word ? {
            label: 'Your task',
            value: `Try to draw word "${word}"`,
        } : {};
    }

    render() {
        const { classes, onWordSelect, isWordDefined, words, ...props } = this.props;
        return (
            <Fragment>
                <Game
                    task={this.getTask()}
                    {...props}
                >
                    <Paint onConvertToImage={this.handleConvertToImage} />
                </Game>
                <Dialog
                    open={isWordDefined}
                >
                    <Box
                        className={classes.wordList}
                    >
                        {
                            words.map((word, index) => (
                                <Button
                                    key={index}
                                    className={classes.wordButton}
                                    variant="outlined"
                                    onClick={e => this.handleWordSelect(e, word)}
                                >
                                    {word}
                                </Button>
                            ))
                        }
                    </Box>
                </Dialog>
            </Fragment>

        )
    }
}

GamePainter.contextType = SocketContext;

export default connect(
    store => {
        return {
            isWordDefined: !store.crocodile.room.word,
            words: store.crocodile.room.words,
        }
    },
)(withStyles(styles)(GamePainter));