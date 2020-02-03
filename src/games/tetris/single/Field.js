import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';
import { connect } from 'react-redux';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { merge } from '../helpers/etc';
import { Grid } from '../components';
import { socketSendMove } from '../../../socket/tetris';
import { COL_SIZE, COL_SIZE_MOBILE } from "../helpers/constants";

class Field extends PureComponent {

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { isOpponent } = this.props;
        if(isOpponent && !isEqual(this.props.field, prevProps.field)) {
            const { socketSendMove, field, preview, speed, score } = this.props;
            socketSendMove({
                field,
                preview,
                speed,
                score,
            });
        }
    }

    render() {
        const { field, width, ...props } = this.props;
        return (
            <Grid
                size={isWidthUp('sm', width) ? COL_SIZE : COL_SIZE_MOBILE}
                grid={field}
                isField={true}
                {...props}
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
            socketSendMove: data => dispatch( socketSendMove(data) ),
        }
    }
)(withWidth()(Field));
