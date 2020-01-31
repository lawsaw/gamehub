import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Grid } from '../components';

class Field extends PureComponent {

    render() {
        const { grid, ...props } = this.props;
        return (
            <Grid
                grid={grid}
                isField={true}
                {...props}
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
)(Field);
