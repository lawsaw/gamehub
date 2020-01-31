import React, { PureComponent } from 'react';
import cx from 'classnames';
import { withStyles, Box, Typography } from "@material-ui/core";
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const styles = () => ({
    score: {},
    typograpy: {
        lineHeight: 1,
    },
});

class Score extends PureComponent {

    render() {
        const { classes, className, score, width } = this.props;
        return (
            <Box
                className={cx(classes.score, className)}
            >
                <Typography
                    variant={isWidthUp('sm', width) ? 'h5' : 'h6'}
                    className={classes.typograpy}
                >
                    {score}
                </Typography>
            </Box>
        )
    }

}

export default withStyles(styles)(withWidth()(Score));
