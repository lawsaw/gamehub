import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { merge } from './helpers/etc';
import { Grid } from './';

class Field extends PureComponent {

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
        return {
            field: store.tetris.figure
                ? merge(store.tetris.figure[store.tetris.rotation], store.tetris.position, store.tetris.table)
                : store.tetris.table,
        }
    }
)(Field);
