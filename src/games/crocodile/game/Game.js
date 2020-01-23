import React, { PureComponent, Fragment } from 'react';
import { withStyles, Grid, Box } from "@material-ui/core";
import { Chat, PlayersBar, RoomInfoBar, Winner } from "./";

const styles = (theme) => ({
    crocodile: {
        alignItems: 'stretch',
        justifyContent: 'stretch',
        height: '100%',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
        }
    },
    paint: {
        position: 'relative',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    paintHeader: {},
    paintWork: {
        position: 'relative',
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    chat: {
        flexBasis: props => (props.isPainter ? 130 : 200),
        flexShrink: 0,
        paddingTop: 0,
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
            flexBasis: '250px !important',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            paddingRight: theme.spacing(1),
            paddingLeft: 0,
        }
    },
    players: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
});

class Game extends PureComponent {

    render() {
        const { classes, task, isPainter, children } = this.props;
        return (
            <Fragment>
                <Grid
                    container
                    spacing={0}
                    wrap="nowrap"
                    className={classes.crocodile}
                >
                    <Grid
                        item
                        className={classes.paint}
                    >
                        <Box
                            className={classes.paintWork}
                        >
                            {children}
                        </Box>
                        <Box
                            className={classes.paintHeader}
                        >
                            <RoomInfoBar
                                data={[
                                    {...task},
                                    {
                                        label: 'Players',
                                        value:  <PlayersBar />
                                    },
                                ]}
                            />
                        </Box>
                    </Grid>
                    <Grid
                        item
                        className={classes.chat}
                    >
                        <Chat
                            painterMode={isPainter}
                        />
                    </Grid>
                </Grid>
                <Winner />
            </Fragment>
        )
    }
}

export default withStyles(styles)(Game);