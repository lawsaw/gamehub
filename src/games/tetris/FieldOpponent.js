import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Grid } from './';

class FieldOpponent extends PureComponent {

    render() {
        const { grid } = this.props;
        return (
            <Grid
                grid={grid}
                isField={true}
            />
        )
    }

}

export default connect(
    store => {
        const { opponent } = store.tetris;
        return {
            grid: opponent.field && opponent.field.length ? opponent.field : store.tetris.table,
        }
    }
)(FieldOpponent);
