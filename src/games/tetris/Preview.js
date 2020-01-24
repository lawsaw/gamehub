import React, { PureComponent } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core";
import { Grid } from './';

const styles = () => ({
    preview: {
        display: 'flex',
        alignItems: 'center',
    },
});

class Preview extends PureComponent {

    render() {
        const { preview, className, classes } = this.props;
        return (
            <Grid
                grid={preview}
                className={cx(classes.preview, className)}
                isPreview={true}
            />
        )
    }

}

export default connect(
    store => {
        return {
            preview: store.tetris.isGameRunning && store.tetris.figureNext[store.tetris.rotationNext],
        }
    },
)(withStyles(styles)(Preview));
