import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';
import { connect } from 'react-redux';
import { merge } from '../helpers/etc';
import { Grid } from '../components';
import { sendMove } from '../../../socket/tetris_emit';

class Field extends PureComponent {

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { isOpponent } = this.props;
        if(isOpponent && !isEqual(this.props.field, prevProps.field)) {
            const { sendMove, field, preview, speed, score } = this.props;
            sendMove({
                field,
                preview,
                speed,
                score,
            });
        }
    }

    render() {
        const { field } = this.props;
        return (
            <Grid
                grid={field}
                isField={true}
            />
        )
    }

}

export default connect(
    store => {
        const { opponent, isGameRunning, figureNext, rotationNext, figure, rotation, position, table, speed, score } = store.tetris;
        return {
            isOpponent: opponent !== null,
            preview: isGameRunning && figureNext[rotationNext],
            speed,
            score,
            field: figure
                ? merge(figure[rotation], position, table)
                : table,
        }
    },
    dispatch => {
        return {
            sendMove: data => dispatch( sendMove(data) ),
        }
    }
)(Field);
