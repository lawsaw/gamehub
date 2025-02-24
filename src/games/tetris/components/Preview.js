import React, { PureComponent } from 'react';
import cx from 'classnames';
import { withStyles } from "@material-ui/core";
import { Grid } from './';

const styles = () => ({
    preview: {
        display: 'flex',
        alignItems: 'center',
    },
});

class Preview extends PureComponent {

    render() {
        const { preview, className, classes, ...props } = this.props;
        return (
            <Grid
                grid={preview}
                className={cx(classes.preview, className)}
                isPreview={true}
                {...props}
            />
        )
    }

}

export default withStyles(styles)(Preview);
