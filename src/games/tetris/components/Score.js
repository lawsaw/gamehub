import React, { PureComponent } from 'react';
import cx from 'classnames';
import { withStyles, Typography, Box } from "@material-ui/core";

const styles = theme => ({
    item: {
        lineHeight: 1,
        '&:not(:first-child)': {
            marginTop: theme.spacing(0.5),
        },
    },
});

const DATA = [
    {
        value: 'score',
        label: 'Score',
    },
    {
        value: 'speed',
        label: 'Speed',
    }
];

class Score extends PureComponent {

    render() {
        const { classes, className } = this.props;
        return (
            <Box>
                {
                    DATA.map(({ value, label }, index) => (
                        <Typography
                            key={index}
                            variant='h6'
                            className={cx(classes.item, className)}
                        >
                            {label}: {this.props[value]}
                        </Typography>
                    ))
                }
            </Box>
        )
    }

}

export default withStyles(styles)(Score);
