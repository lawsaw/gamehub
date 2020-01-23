import React, { PureComponent } from 'react';
import cx from 'classnames';
import { withStyles, Toolbar as ToolbarMaterial } from "@material-ui/core";

const styles = theme => ({
    toolbar: {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        minHeight: 'auto',
    },
});

class Toolbar extends PureComponent {

    render() {
        const { classes, className, children, ...props } = this.props;
        return (
            <ToolbarMaterial
                className={cx(classes.toolbar, className)}
                {...props}
            >
                {children}
            </ToolbarMaterial>
        )
    }

}

export default withStyles(styles)(Toolbar);
