import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { withStyles, AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import { HOME } from '../helpers/routes';

const styles = () => ({
    appBar: {},
    title: {
        flexGrow: 1,
    },
});

class Header extends PureComponent {

    render() {
        const { classes, location: { pathname }, header, sub_header, topAction } = this.props;
        return (
            <AppBar
                position="static"
                color="primary"
                className={classes.appBar}
            >
                <Toolbar>
                    {
                        pathname !== HOME.link && (
                            <IconButton
                                component={Link}
                                to={HOME.link}
                                onClick={topAction}
                            >
                                <HomeIcon />
                            </IconButton>
                        )
                    }
                    <Typography variant="h6" className={classes.title}>
                        {
                            header && `${header}`
                        }
                        {
                            sub_header && `/${sub_header}`
                        }
                    </Typography>
                    {
                        topAction && (
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                onClick={topAction}
                            >
                                Leave
                            </Button>
                        )
                    }
                </Toolbar>
            </AppBar>
        )
    }

}

export default connect(
    store => {
        const { header, sub_header, topAction } = store.app;
        return {
            header,
            sub_header,
            topAction,
        }
    }
)(withStyles(styles)(Header));
