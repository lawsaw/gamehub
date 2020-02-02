import React, { PureComponent } from 'react';
import { withStyles, Box } from "@material-ui/core";
import { Field, Toolbar, Preview } from './';

const styles = theme => ({
    opponent: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            bottom: 0,
        },
    },
    toolbar: {},
});

class Opponent extends PureComponent {

    render() {
        const { classes, size } = this.props;
        return (
            <Box
                className={classes.opponent}
            >
                <Field size={size} />
                <Box
                    className={classes.toolbar}
                >
                    <Toolbar
                        previewComponent={<Preview size={size} />}
                    />
                </Box>
            </Box>
        )
    }

}

export default withStyles(styles)(Opponent);
