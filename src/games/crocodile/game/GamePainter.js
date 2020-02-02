import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Box, Button, Dialog } from "@material-ui/core";
import { Paint, Game } from "./";
import { socketWordSelect, socketPaint } from "../../../socket/crocodile";

const styles = theme => ({
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
        const { socketWordSelect } = this.props;
        socketWordSelect(word);
    }

    handleConvertToImage = (canvas) => {
        if(!canvas) return false;
        const { socketPaint } = this.props;
        let image = canvas.current.toDataURL();
        socketPaint(image);
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

export default connect(
    store => {
        return {
            isWordDefined: !store.crocodile.room.word,
            words: store.crocodile.room.words,
        }
    },
    dispatch => {
        return {
            socketWordSelect: word => dispatch( socketWordSelect(word) ),
            socketPaint: image => dispatch( socketPaint(image) ),
        }
    }
)(withStyles(styles)(GamePainter));