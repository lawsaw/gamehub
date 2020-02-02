import React, { PureComponent } from 'react';
import cx from 'classnames';
import { withStyles, Box } from "@material-ui/core";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { ROWS_HIDDEN, ROWS, COLS, COL_SIZE } from '../helpers/constants';

const styles = () => ({
    field: {
        position: 'relative',
        height:  props => ((ROWS - ROWS_HIDDEN) * props.size - (ROWS - ROWS_HIDDEN - 1)),
        width: props => (COLS * props.size - COLS + 1),
        overflow: 'hidden',
        // '&$fieldPreview': {
        //     height: props => (ROWS_HIDDEN * props.size),
        //     width: props => (ROWS_HIDDEN * props.size),
        // },
    },
    fieldPreview: {
        height: props => (ROWS_HIDDEN * props.size),
        width: props => (ROWS_HIDDEN * props.size),
    },
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
        width: props => props.size,
        height: props => props.size,
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
        pointerEvents: 'none',
    },
    colPreview: {},
});

class Grid extends PureComponent {

    static defaultProps = {
        size: COL_SIZE,
    };

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
