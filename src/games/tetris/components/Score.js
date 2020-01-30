import React, { PureComponent } from 'react';
import cx from 'classnames';
import { withStyles, Box, Typography } from "@material-ui/core";
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const styles = () => ({
    score: {},
});

class Score extends PureComponent {

    render() {
        const { classes, className, score, width } = this.props;
        return (
            <Box
                className={cx(classes.score, className)}
            >
                <Typography
                    variant={isWidthUp('sm', width) ? 'h3' : 'h5'}
                >
                    {score}
                </Typography>
            </Box>
        )
    }

}

export default withStyles(styles)(withWidth()(Score));
