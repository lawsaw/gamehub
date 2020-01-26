import React, { PureComponent, Fragment } from 'react';
import { withStyles, Box } from "@material-ui/core";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Engine, Field, Toolbar, MobileBar } from './';
import { COL_SIZE } from './helpers/constants';

const styles = theme => ({
    layout: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    header: {},
    body: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    content: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    toolbar: {
        //alignSelf: 'flex-start',
        [theme.breakpoints.up('sm')]: {
            marginLeft: COL_SIZE,
        },
    },
    mobileBar: {
        //flexBasis: 50,
        alignSelf: 'stretch',
    },
});

class SinglePlayer extends PureComponent {

    render() {
        const { classes, width } = this.props;
        return (
            <Fragment>
                <Engine />
                <Box
                    className={classes.layout}
                >
                    <Box
                        className={classes.body}
                    >
                        <Box
                            className={classes.content}
                        >
                            <Field />
                            <Box
                                className={classes.toolbar}
                            >
                                <Toolbar />
                            </Box>
                        </Box>
                    </Box>
                    {
                        isWidthDown('xs', width) ? (
                            <Box
                                className={classes.mobileBar}
                            >
                                <MobileBar />
                            </Box>
                        ) : null
                    }
                </Box>
            </Fragment>
        )
    }

}

export default withWidth()(withStyles(styles)(SinglePlayer));
