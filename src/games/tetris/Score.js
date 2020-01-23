import React, { PureComponent } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { withStyles, Box, Typography } from "@material-ui/core";

const styles = () => ({
    score: {},
});

class Score extends PureComponent {

    render() {
        const { classes, className, score } = this.props;
        return (
            <Box
                className={cx(classes.score, className)}
            >
                <Typography
                    variant="h3"
                >
                    {score}
                </Typography>
            </Box>
        )
    }

}

export default connect(
    store => {
        return {
            score: store.tetris.score,
        }
    },
)(withStyles(styles)(Score));
