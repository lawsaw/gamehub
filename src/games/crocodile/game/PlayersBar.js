import React, {PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles, Box, Chip } from "@material-ui/core";

const styles = (theme) => ({
    players: {
       alignSelf: 'flex-start',
       display: 'flex',
       justifyContent: 'center',
       flexWrap: 'wrap',
       '& > *': {
           margin: theme.spacing(0.5),
       },
   },
});

class PlayersBar extends PureComponent {

    handleClick = playerId => (e) => {
        //console.log({playerId, e});
    }

    render() {
        const { classes, players, painterId } = this.props;
        const arrayOfPlayers = Object.keys(players);
        return (
            <Box
                className={classes.players}
            >
                {
                    players && arrayOfPlayers.length ? arrayOfPlayers.map((playerId, index) => (
                        <Chip
                            key={index}
                            size="small"
                            label={players[playerId].nickname}
                            color={painterId === playerId ? 'primary' : 'default'}
                            //onClick={this.handleClick(playerId)}
                        />
                    )) : 'There is no players in this room'
                }
            </Box>
        )
    }
}

export default connect(
    store => {
        return {
            players: store.crocodile.room.players,
            painterId: (store.crocodile.room.painter || {}).id,
        }
    },
)(withStyles(styles)(PlayersBar));