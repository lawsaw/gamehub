import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles, Grid } from "@material-ui/core";
import { Header, Footer } from './containers';
import { ROUTES } from './helpers/routes';
import IO from './IO';
import { Page404 } from './pages';

const styles = () => ({
    layout: {
        backgroundColor: '#191922',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    header: {
        backgroundColor: '#121216',
    },
    body: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    footer: {
        //height: 25,
    },
});

class Root extends PureComponent {

    render() {
        const { classes } = this.props;
        return (
            <Router>
                <IO />
                <Grid
                    container
                    direction="column"
                    alignItems="stretch"
                    justify="space-between"
                    className={classes.layout}
                >
                    <Grid
                        item
                        className={classes.header}
                    >
                        <Route
                            component={props => <Header {...props} />}
                        />
                    </Grid>
                    <Grid
                        item
                        className={classes.body}
                    >
                        <Switch>
                            {
                                ROUTES.map(({ link, label, page }, index) => (
                                    <Route
                                        key={index}
                                        exact
                                        path={link}
                                        component={page}
                                    />
                                ))
                            }
                            <Route
                                path="/:errorPage"
                                component={props => <Page404 {...props} />}
                            />
                        </Switch>
                    </Grid>
                    <Grid
                        item
                        className={classes.footer}
                    >
                        <Footer />
                    </Grid>
                </Grid>
            </Router>
        )
    }

}

export default withStyles(styles)(Root);
