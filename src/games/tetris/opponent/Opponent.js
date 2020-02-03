import React, { PureComponent } from 'react';
import { withStyles } from "@material-ui/core";
import { PlayerInterface } from '../components';
import { Field, Toolbar, Preview } from './';

const styles = theme => ({
    opponent: {
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            bottom: 0,
        },
    },
});

class Opponent extends PureComponent {

    render() {
        const { classes, size, labelClassName, toolbarClassName } = this.props;
        return (
            <PlayerInterface
                className={classes.opponent}
                field={<Field size={size} />}
                toolbar={(
                    <Toolbar
                        className={toolbarClassName}
                        labelClassName={labelClassName}
                        previewComponent={<Preview size={size} />}
                    />
                )}
            />
        )
    }

}

export default withStyles(styles)(Opponent);
