import React, { PureComponent, forwardRef } from 'react';
import { withStyles, Container, Grid, Card, CardActionArea, CardContent, Typography } from "@material-ui/core";
import { RouteLink } from '../components';
import { GAMES } from '../helpers/routes';

const styles = () => ({
    home: {},
    card: {
        height: '100%',
    },
    actionArea: {
        height: '100%',
    },
});

class Home extends PureComponent {

    render() {
        const { classes } = this.props;
        return (
            <Container>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="stretch"
                    spacing={1}
                >
                    {
                        GAMES.map(({ label, description, link }) => {
                            let LinkCustom = forwardRef((props, ref) => (
                                <RouteLink
                                    to={link}
                                    label={
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {label}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {description}
                                            </Typography>
                                        </CardContent>
                                    }
                                    {...props}
                                />
                            ));
                            let cardActionArea = props => (
                                <CardActionArea
                                    className={classes.actionArea}
                                    {...props}
                                />
                            );
                            return (
                                <Grid
                                    key={link}
                                    item
                                    zeroMinWidth
                                    xs={6}
                                    md={4}
                                    lg={3}
                                >
                                    <Card
                                        className={classes.card}
                                    >
                                        <LinkCustom
                                            component={cardActionArea}
                                        />
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        )
    }

}

export default withStyles(styles)(Home);
