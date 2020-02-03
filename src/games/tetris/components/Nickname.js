import React, { PureComponent } from 'react';
import cx from 'classnames';
import { withStyles, Box, Typography } from "@material-ui/core";

const styles = () => ({
    nickname: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        alignItems: 'stretch',
        justifyContent: 'stretch',
    },
    value: {
        lineHeight: 1.1,
        width: 0,
        flexGrow: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
});

class Nickname extends PureComponent {

    render() {
        const { classes, name, className } = this.props;
        return (
            <Box
                className={classes.nickname}
            >
                <Typography
                    variant='h6'
                    className={cx(classes.value, className)}
                >
                    {name}
                </Typography>
            </Box>
        )
    }

}

export default withStyles(styles)(Nickname);
