import React, { PureComponent } from 'react';
import cx from 'classnames';
import { withStyles, Fab as FabMaterial } from "@material-ui/core";
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const styles = () => ({
    button: {},
    typograpy: {
        lineHeight: 1,
    },
});

class Fab extends PureComponent {

    static defaultProps = {
        icon: 'Add',
    }

    render() {
        const { classes, className, icon, ...props } = this.props;
        let iconComponent = require(`@material-ui/icons/${icon}`);
        return (
            <FabMaterial
                className={cx(classes.button, className)}
                {...props}
            >
                {iconComponent.default.type.render()}
            </FabMaterial>
        )
    }

}

export default withStyles(styles)(withWidth()(Fab));
