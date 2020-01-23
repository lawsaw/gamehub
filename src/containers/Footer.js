import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { Toolbar } from '../components';

const styles = theme => ({
    footerToolbar: {
        textAlign: 'center',
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        justifyContent: 'center',
    }
});

class Footer extends PureComponent {

    render() {
        const { classes, status } = this.props;
        return (
            <Toolbar
                className={classes.footerToolbar}
            >
                {status}
            </Toolbar>
        )
    }

}

export default connect(
    store => {
        return {
            status: (store.crocodile.room || {}).appStatusText,
        }
    }
)(withStyles(styles)(Footer));
