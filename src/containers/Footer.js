import React, { PureComponent, Fragment } from 'react';
import { connect } from "react-redux";
import { withStyles, Box } from "@material-ui/core";

const styles = theme => ({
    // footerToolbar: {
    //     textAlign: 'center',
    //     paddingTop: theme.spacing(0.5),
    //     paddingBottom: theme.spacing(0.5),
    //     //justifyContent: 'center',
    // },
    copyright: {
        textAlign: 'center',
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
    },
    status: {
        textAlign: 'center',
        backgroundColor: '#121216',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    link: {
        color: theme.palette.primary.main,
    },
});

class Footer extends PureComponent {

    render() {
        const { classes, status } = this.props;
        return (
            <Fragment>
                {
                    status ? (
                        <Box className={classes.status}>{status}</Box>
                    ) : null
                }
                <Box className={classes.copyright}>
                    made by <a className={classes.link} target={'_blank'} href={'https://t.me/LawSaw'}>Oleksandr Troitskyi</a>
                </Box>
            </Fragment>
        );
    }

}

export default connect(
    store => {
        return {
            //status: (store.crocodile.room || {}).appStatusText,
            status: store.app.status,
        }
    }
)(withStyles(styles)(Footer));
