import React, { PureComponent } from 'react';
import cx from 'classnames';
import { withStyles, Box } from "@material-ui/core";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { ROWS_HIDDEN, COL_SIZE, COL_SIZE_MOBILE, ROWS, COLS } from './helpers/constants';

const setSize = size => ({
    height:  (ROWS - ROWS_HIDDEN) * size - (ROWS - ROWS_HIDDEN - 1),
    width: COLS * size - COLS + 1,
});

const styles = theme => ({
    field: {
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
            ...setSize(COL_SIZE),
        },
        [theme.breakpoints.down('xs')]: {
            ...setSize(COL_SIZE_MOBILE),
        },
        '&$fieldPreview': {
            [theme.breakpoints.up('sm')]: {
                height: ROWS_HIDDEN * COL_SIZE,
                width: ROWS_HIDDEN * COL_SIZE,
            },
            [theme.breakpoints.down('xs')]: {
                height: ROWS_HIDDEN * COL_SIZE_MOBILE,
                width: ROWS_HIDDEN * COL_SIZE_MOBILE,
            },
        },
    },
    fieldPreview: {},
    fieldInner: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        '$fieldPreview &': {
            position: 'relative',
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
        [theme.breakpoints.up('sm')]: {
            width: COL_SIZE,
            height: COL_SIZE,
        },
        [theme.breakpoints.down('xs')]: {
            width: COL_SIZE_MOBILE,
            height: COL_SIZE_MOBILE,
        },
        flexShrink: 0,
        margin: 0,
        border: `1px solid ${fade('#999', 0.5)}`,
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
                borderColor: fade('#999', 0.5),
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
        const { classes, grid, isField, isPreview, className } = this.props;
        return (
            <Box
                className={cx(classes.field, isPreview && classes.fieldPreview, className)}
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
