import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core";
import { Game, Screen } from "./";

const styles = () => ({

});

class GameWatcher extends PureComponent {

    getTask = () => {
        const { word, painter_name } = this.props;
        return word ? {
            label: 'Your task',
            value: `Try to guess the word that ${painter_name} is drawing`,
        } : {};
    }

    render() {
        let task = this.getTask();
        return (
            <Game
                task={task}
                {...this.props}
            >
                <Screen />
            </Game>
        )
    }
}

export default connect(
    store => {
        return {
            word: store.crocodile.room.word,
            painter_name: (store.crocodile.room.painter || {}).nickname,
        }
    },
)(withStyles(styles)(GameWatcher));