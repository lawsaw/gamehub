import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core";
import { PlayerInterface } from '../components';
import { Field, Toolbar, Preview } from './';
import { COL_SIZE } from "../helpers/constants";
import { HEADER_HEIGHT } from "../../../helpers/constants";

const styles = theme => ({
    toolbar: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: COL_SIZE,
        },
    },
    preview: {
        [theme.breakpoints.down('xs')]: {
            position: 'fixed',
            top: HEADER_HEIGHT.MIN,
            right: 0,
            opacity: 0.25,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
});

class Single extends PureComponent {

    render() {
        const { classes, size, isOpponent } = this.props;
        return (
            <PlayerInterface
                field={<Field size={size} />}
                toolbar={(
                    <Toolbar
                        previewComponent={<Preview size={size} className={isOpponent ? classes.preview : ''} />}
                    />
                )}
                toolbarClassName={!isOpponent && classes.toolbar}
            />
        )
    }

}

export default connect(
    store => {
        const { opponent } = store.tetris;
        return {
            isOpponent: opponent !== null,
        }
    },
)(withStyles(styles)(Single));
