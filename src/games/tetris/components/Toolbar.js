import React, { PureComponent } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { withStyles, Box } from "@material-ui/core";
import { Toolbar as ToolbarComponent } from '../../../components';

const styles = theme => ({
    toolbar: {
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'stretch',
        height: '100%',
    },
    item: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    item_with_opponent: {
        '&:not(:first-child)': {
            [theme.breakpoints.up('sm')]: {
                marginTop: theme.spacing(1),
            },
            [theme.breakpoints.down('xs')]: {
                marginTop: theme.spacing(0.5),
            },
        },
    },
    item_without_opponent: {
        '&:not(:first-child)': {
            marginTop: theme.spacing(2),
        },
    },
    score: {
        //flexGrow: 1,
    },
});

class Toolbar extends PureComponent {

    render() {
        const { classes, data, isOpponent, className } = this.props;
        return (
            <ToolbarComponent
                className={cx(classes.toolbar, className)}
            >
                {
                    data.map((children, index) => children ? (
                        <Box
                            key={index}
                            className={cx(classes.item, isOpponent ? classes.item_with_opponent : classes.item_without_opponent)}
                        >
                            {children}
                        </Box>
                    ) : null)
                }
            </ToolbarComponent>
        )
    }

}

export default connect(
    store => {
        const { opponent } = store.tetris;
        return {
            isOpponent: opponent !== null,
        }
    },
)(withStyles(styles)(Toolbar));
