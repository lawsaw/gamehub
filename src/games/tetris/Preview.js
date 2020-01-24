import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core";
import { Grid } from './';

const styles = () => ({
    grid: {
        // color: 'blue',
        // '& > *': {
        //     color: 'red',
        //     '& > *': {
        //         color: 'green',
        //         '&:first-child > *': {
        //             borderTopColor: 'transparent',
        //         },
        //         '&:last-child > *': {
        //             borderBottomColor: 'transparent',
        //         },
        //         '& > *': {
        //             '&:first-child': {
        //                 borderLeftColor: 'transparent',
        //             },
        //             '&:last-child': {
        //                 borderRightColor: 'transparent',
        //             },
        //         },
        //     },
        // },
    },
});

class Preview extends PureComponent {

    render() {
        const { preview, classes } = this.props;
        return (
            <Grid
                grid={preview}
                className={classes.grid}
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
