import React, { PureComponent } from 'react';
import cx from 'classnames';
import { withStyles, Box } from "@material-ui/core";

const styles = () => ({
    playerInterface: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    toolbar: {},
});

class PlayerInterface extends PureComponent {

    render() {
        const { classes, className, toolbarClassName, field, toolbar } = this.props;
        return (
            <Box
                className={cx(classes.playerInterface, className)}
            >
                {field}
                <Box
                    className={cx(classes.toolbar, toolbarClassName)}
                >
                    {toolbar}
                </Box>
            </Box>
        )
    }

}

export default withStyles(styles)(PlayerInterface);
