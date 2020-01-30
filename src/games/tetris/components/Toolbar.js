import React, { PureComponent } from 'react';
import { withStyles, Box } from "@material-ui/core";
import { Toolbar as ToolbarComponent } from '../../../components';

const styles = theme => ({
    toolbar: {
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    item: {
        '&:not(:first-child)': {
            marginTop: theme.spacing(2),
            // [theme.breakpoints.up('sm')]: {
            //     marginTop: theme.spacing(3),
            // },
            // [theme.breakpoints.down('xs')]: {
            //
            // },
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
