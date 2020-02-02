import React, { PureComponent } from 'react';
import { withStyles, Box } from "@material-ui/core";
import { Toolbar as ToolbarComponent } from '../../../components';

const styles = theme => ({
    toolbar: {
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'flex-start',
        height: '100%',
    },
    item: {
        '&:not(:first-child)': {
            [theme.breakpoints.up('sm')]: {
                marginTop: theme.spacing(1),
            },
            [theme.breakpoints.down('xs')]: {
                marginTop: theme.spacing(0.5),
            },
        },
    },
    score: {
        //flexGrow: 1,
    },
});

class Toolbar extends PureComponent {

    render() {
        const { classes, data } = this.props;
        return (
            <ToolbarComponent
                className={classes.toolbar}
            >
                {
                    data.map((children, index) => children ? (
                        <Box
                            key={index}
                            className={classes.item}
                        >
                            {children}
                        </Box>
                    ) : null)
                }
            </ToolbarComponent>
        )
    }

}

export default withStyles(styles)(Toolbar);
