import React, {PureComponent } from 'react';
import { withStyles, Box } from "@material-ui/core";
import { Toolbar } from '../../../components';

const styles = (theme) => ({
    roomInfoBar: {
        position: 'relative',
        alignSelf: 'flex-start',
        width: '100%',
        marginBottom: theme.spacing(1),
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    label: {
        flexBasis: 70,
    },
    value: {
        marginLeft: theme.spacing(2),
    },
});

class RoomInfoBar extends PureComponent {

    render() {
        const { classes, data } = this.props;

        return (
            <Toolbar>
                <Box
                    className={classes.roomInfoBar}
                >
                    {
                        data.map(({ label, value }, index) => (label && value) ? (
                            <Box
                                key={index}
                                className={classes.item}
                            >
                                <Box
                                    className={classes.label}
                                    fontWeight="fontWeightMedium"
                                >
                                    {label}:
                                </Box>
                                <Box
                                    className={classes.value}
                                >
                                    {value}
                                </Box>
                            </Box>
                        ) : null)
                    }
                </Box>
            </Toolbar>
        )
    }
}

export default withStyles(styles)(RoomInfoBar);