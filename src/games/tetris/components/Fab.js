import React, { PureComponent } from 'react';
import cx from 'classnames';
import { withStyles, Fab as FabMaterial } from "@material-ui/core";

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
        //let iconComponent = require(`@material-ui/icons/${icon}`);
        return (
            <FabMaterial
                className={cx(classes.button, className)}
                {...props}
            >
                {icon}
            </FabMaterial>
        )
    }

}

export default withStyles(styles)((Fab));
