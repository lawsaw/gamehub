import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { withStyles, Box } from "@material-ui/core";
import { ROWS_HIDDEN, COL_SIZE, ROWS, COLS } from './helpers/constants';
import { merge } from './helpers/etc';

const styles = () => ({
    field: {
        position: 'relative',
        height: (ROWS - ROWS_HIDDEN) * COL_SIZE - (ROWS - ROWS_HIDDEN - 1),
        width: COLS * COL_SIZE - COLS + 1,
        //overflow: 'hidden',
        '&$fieldPreview': {
            height: ROWS_HIDDEN * COL_SIZE,
            width: ROWS_HIDDEN * COL_SIZE,
        },
    },
    fieldPreview: {},
    fieldInner: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        '$fieldPreview &': {
            bottom: 'auto',
            top: 0,
        }
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexWrap: 'nowrap',
        '&:not(:first-child)': {
            marginTop: -1,
        }
    },
    col: {
        width: COL_SIZE,
        height: COL_SIZE,
        flexShrink: 0,
        margin: 0,
        border: '1px solid lightgrey',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        '&:not(:first-child)': {
            marginLeft: -1,
        },
        '&$colPreview': {
            borderColor: 'transparent',
            '&$square': {
                borderColor: 'lightgrey',
            },
        },
    },
    square: {
        backgroundColor: 'grey',
    },
    hidden: {
        opacity: 0,
    },
    colPreview: {},
});

class Grid extends PureComponent {

    render() {
        const { classes, grid, isField, isPreview } = this.props;
        return (
            <Box
                className={cx(classes.field, isPreview && classes.fieldPreview)}
            >
                <Box
                    className={classes.fieldInner}
                >
                    {
                        grid ? grid.map((row, rowIndex) => (
                            <Box
                                key={rowIndex}
                                className={cx(classes.row, isField && (rowIndex < ROWS_HIDDEN) && classes.hidden)}
                            >
                                {
                                    row.map((col, colIndex) => (
                                        <Box
                                            key={colIndex}
                                            className={cx(classes.col, col===1 && classes.square, isPreview && classes.colPreview)}
                                        />
                                    ))
                                }
                            </Box>
                        )) : null
                    }
                </Box>
            </Box>
        )
    }

}

export default withStyles(styles)(Grid);
