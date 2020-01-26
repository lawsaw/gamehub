import React, { PureComponent } from 'react';
import { withStyles, Table, TableHead, TableCell, TableRow } from "@material-ui/core";
import { Modal } from './';

const styles = () => ({
    table: {
        //maxWidth: 300,
    },
    row: {
        '&:only-child': {
            '& > *': {
                border: 'none',
            }
        }
    },
});

class Results extends PureComponent {

    render() {
        const { classes, data, onClose } = this.props;
        return data && data.length ? (
            <Modal
                open={true}
                title="Game results"
                isCancel={true}
                onClose={onClose}
            >
                <Table className={classes.table}>
                    <TableHead>
                        {
                            data.map(({ label, value }, index) => (
                                <TableRow
                                    key={index}
                                    className={classes.row}
                                >
                                    <TableCell>{label}: </TableCell>
                                    <TableCell align="right">{value}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableHead>
                </Table>
            </Modal>
        ) : null;
    }
}

export default withStyles(styles)(Results);