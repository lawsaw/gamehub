import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {withStyles, Box } from "@material-ui/core";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Engine } from './';
import { MobileBar, Single } from './single';
import { Opponent } from './opponent';
import { closeResults } from "../../actions/tetris";

const styles = () => ({
    layout: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    body: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    mobileBar: {
        //flexBasis: 50,
        alignSelf: 'stretch',
    },
});

class Arena extends PureComponent {

    render() {
        const { classes, width, isOpponent } = this.props;

        let is_mobile = isWidthDown('xs', width);
        let is_tablet = isWidthDown('sm', width);
        let col_size = is_mobile ? 20 : 30;

        return (
            <Fragment>
                <Engine />
                <Box
                    className={classes.layout}
                >
                    <Box
                        className={classes.body}
                    >
                        <Single
                            size={col_size}
                        />
                        {
                            isOpponent && !is_tablet ? (
                                <Opponent
                                    size={col_size}
                                />
                            ) : null
                        }
                    </Box>
                    {
                        is_mobile ? (
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

export default connect(
    store => {
        return {
            isOpponent: store.tetris.opponent !== null,
        }
    },
    dispatch => {
        return {
            closeResults: () => { dispatch(closeResults()) },
        }
    }
)(withRouter(withWidth()(withStyles(styles)(Arena))));
