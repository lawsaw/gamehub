import React, { PureComponent } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, Dialog, DialogTitle, DialogActions, DialogContent, IconButton, Typography, Button } from "@material-ui/core";

const styles = theme => ({
    title: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    titleLabel: {
        flexGrow: 1,
    },
    content: {
        padding: theme.spacing(2),
    },
    actions: {
        padding: theme.spacing(2),
    },
});

const StyledDialog = withStyles(() => ({
    paper: {
        width: '100%',
    },
}))(Dialog);

class Modal extends PureComponent {

    handleClose = () => {
        const { onClose } = this.props;
        onClose();
    }

    render() {
        const { classes, open, title, isCancel, buttons, children } = this.props;
        return (
            <StyledDialog
                open={open}
                onClose={this.handleClose}
                maxWidth="xs"
            >
                <DialogTitle
                    disableTypography
                    className={classes.title}
                >
                    <Typography
                        variant="h6"
                        className={classes.titleLabel}
                    >
                        {title}
                    </Typography>
                    {
                        isCancel ? (
                            <IconButton onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        ) : null
                    }
                </DialogTitle>
                <DialogContent
                    dividers
                    className={classes.content}
                >
                    {children}
                </DialogContent>
                <DialogActions
                    className={classes.actions}
                >
                    {
                        buttons ? buttons.map(({ label, ...props }, index) => (
                            <Button
                                key={index}
                                {...props}
                            >
                                {label}
                            </Button>
                        )) : null
                    }
                    {
                        isCancel ? (
                            <Button
                                variant="contained"
                                onClick={this.handleClose}
                                color="secondary"
                            >
                                Cancel
                            </Button>
                        ) : null
                    }
                </DialogActions>
            </StyledDialog>
        );
    }
}

export default withStyles(styles)(Modal);