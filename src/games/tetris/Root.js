import React, { PureComponent, forwardRef } from 'react';
import { withStyles, Container, Grid, CardContent, Typography, CardActionArea, Card } from "@material-ui/core";
import { RouteLink } from '../../components';
import { TETRIS_ROUTES } from '../../helpers/routes';

const styles = () => ({

});

class Root extends PureComponent {

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
                        TETRIS_ROUTES.map(({ label, link, description }) => {
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

export default withStyles(styles)(Root);
