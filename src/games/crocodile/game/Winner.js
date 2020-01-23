import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles, Box, Dialog, DialogTitle, Table, TableHead, TableCell, TableRow } from "@material-ui/core";

const styles = () => ({
    table: {
        maxWidth: 300,
    },
});

class Winner extends PureComponent {

    render() {
        const { classes, winner_name, word } = this.props;
        return winner_name ? (
            <Dialog
                open={true}
            >
                <DialogTitle>
                    <Box>
                        <Box component="h4">
                           The game is over!
                        </Box>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Winner: </TableCell>
                                    <TableCell align="right">{winner_name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Right word: </TableCell>
                                    <TableCell align="right">{word}</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </Box>
                </DialogTitle>
            </Dialog>
        ) : null;
    }
}

export default connect(
    store => {
        return {
            winner_name: (store.crocodile.room.winner || {}).nickname,
            word: store.crocodile.room.word,
        }
    },
)(withStyles(styles)(Winner));