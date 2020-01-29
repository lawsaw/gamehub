import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';
import { connect } from 'react-redux';
import { merge } from './helpers/etc';
import { Grid } from './';
import SocketContext from '../../helpers/SocketContext';
import { sendMove } from '../../socket/tetris_emit';

class Field extends PureComponent {

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { isOpponent } = this.props;
        if(isOpponent && !isEqual(this.props.field, prevProps.field)) {
            const { sendMove, field, preview } = this.props;
            sendMove({
                field,
                preview
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

Field.contextType = SocketContext;

export default connect(
    store => {
        const { opponent, isGameRunning, figureNext, rotationNext, figure, rotation, position, table } = store.tetris;
        return {
            isOpponent: opponent !== null,
            preview: isGameRunning && figureNext[rotationNext],
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
