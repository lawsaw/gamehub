import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {withStyles, Box } from "@material-ui/core";
import withWidth, { isWidthDown, isWidthUp } from '@material-ui/core/withWidth';
import { Engine } from './';
import { Field as FieldSingle, Toolbar as ToolbarSingle, MobileBar, Preview as PreviewSingle } from './single';
import { Field as FieldOpponent, Toolbar as ToolbarOpponent, Opponent } from './opponent';
import { COL_SIZE } from './helpers/constants';
import { setApp } from "../../actions/app";
import { TETRIS } from '../../helpers/routes';

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
        flexDirection: 'row',
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

class Arena extends PureComponent {

    componentDidMount() {
        const { setApp } = this.props;
        setApp({
            topAction: this.handleLeave,
        });
    }

    componentWillUnmount() {
        const { setApp } = this.props;
        setApp({
            topAction: null,
        });
    }

    handleLeave = () => {
        const { history } = this.props;
        console.log(history);
        history.push(TETRIS.link);
    }

    render() {
        const { classes, width, isOpponent } = this.props;

        let isMobile = isWidthDown('xs', width);
        let isTablet = isWidthDown('sm', width);
        let col_size = isMobile ? 15 : 30;

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
                            <FieldSingle size={col_size} />
                            <Box
                                className={classes.toolbar}
                            >
                                <ToolbarSingle
                                    previewComponent={<PreviewSingle size={col_size} />}
                                />
                            </Box>
                        </Box>
                        {
                            isOpponent && !isTablet ? (
                                <Opponent
                                    size={col_size}
                                />
                            ) : null
                        }
                    </Box>
                    {
                        isMobile ? (
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
            setApp: options => dispatch( setApp(options) ),
        }
    }
)(withRouter(withWidth()(withStyles(styles)(Arena))));
