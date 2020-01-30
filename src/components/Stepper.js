import React, { PureComponent } from 'react';
import cx from 'classnames';
import { withStyles, Box, Button } from "@material-ui/core";

const styles = theme => ({
    stepper: {
        marginTop: theme.spacing(3),
        width: 250,
    },
    button: {
        margin: theme.spacing(1),
    }
});

class Stepper extends PureComponent {

    render() {
        const { classes, className, isBack=true, isNext=true, onBack, onNext, ...props } = this.props;
        return (
            <Box
                className={cx(classes.stepper, className)}
                {...props}
            >
                {
                    isBack ? (
                        <Button
                            variant='contained'
                            onClick={onBack}
                            className={classes.button}
                        >
                            Back
                        </Button>
                    ) : null
                }
                {
                    isNext ? (
                        <Button
                            variant='contained'
                            onClick={onNext}
                            className={classes.button}
                        >
                            Next
                        </Button>
                    ) : null
                }
            </Box>
        )
    }

}

export default withStyles(styles)(Stepper);
