import React, { PureComponent } from 'react';
import { withStyles, Box } from "@material-ui/core";
import { Engine, Field, Toolbar, Preview } from './';
import { COL_SIZE } from './helpers/constants';

const styles = () => ({
    layout: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    header: {},
    body: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    preview: {
        alignSelf: 'flex-start',
        marginLeft: COL_SIZE,
    },
});

class SinglePlayer extends PureComponent {

    render() {
        const { classes } = this.props;
        return (
            <Box
                className={classes.layout}
            >
                <Engine />
                <Box
                    className={classes.header}
                >
                    <Toolbar />
                </Box>
                <Box
                    className={classes.body}
                >
                    <Box
                        className={classes.content}
                    >
                        <Field />
                        <Box
                            className={classes.preview}
                        >
                            <Preview />
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }

}

export default withStyles(styles)(SinglePlayer);
