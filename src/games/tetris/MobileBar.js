import React, { PureComponent } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { withStyles, IconButton, Button, Box } from "@material-ui/core";
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import { Toolbar as ToolbarComponent } from '../../components';
import { Score, Preview } from './';
import { startMoving, startNewGame, stopGame, stopMoving } from "../../actions/tetris";
import RotateRightIcon from '@material-ui/icons/RotateRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { KEY_MAP } from './helpers/constants';

const ARROW_SIZE = 60;

const styles = theme => ({
    mobileBar: {
        position: 'relative',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        zIndex: 1,
        height: ARROW_SIZE*2,
    },
    item: {
        '&:first-child': {
            marginLeft: ARROW_SIZE,
        },
        '&:last-child': {
            marginRight: ARROW_SIZE,
        },
    },
    arrows: {
        position: 'relative',
        width: ARROW_SIZE,
        height: ARROW_SIZE,
        marginTop: -ARROW_SIZE,
        marginBottom: ARROW_SIZE,
    },
    touchButton: {
        width: ARROW_SIZE,
        height: ARROW_SIZE,
        padding: 0,
        minWidth: 'auto',
    },
    arrow: {
        position: 'absolute',
        '&:nth-child(1)': {
            top: 0,
            left: '-100%',
        },
        '&:nth-child(2)': {
            top: 0,
            right: '-100%',
        },
        '&:nth-child(3)': {
            bottom: '-100%',
        },
        '&:only-child': {
            top: 0,
            left: 0,
        },
    }
});

const TouchButton = ({ classes, onClick, icon, className }) => {
    return (
        <Box
            component={Button}
            className={className}
            onClick={onClick}
        >
            {icon}
        </Box>
    )
};

const ARROWS_MAP = [
    {
        icon: <KeyboardArrowLeftIcon />,
        action: KEY_MAP.LEFT
    },{
        icon: <KeyboardArrowRightIcon />,
        action: KEY_MAP.RIGHT
    },{
        icon: <KeyboardArrowDownIcon />,
        action: KEY_MAP.SPACE
    }
];

class MobileBar extends PureComponent {

    render() {
        const { classes, key_map } = this.props;
        return (
            <Box
                className={classes.mobileBar}
            >
                <Box
                    className={classes.item}
                >
                    <Box
                        className={classes.arrows}
                    >
                        {
                            ARROWS_MAP.map(({ icon, action }, index) => (
                                <TouchButton
                                    key={index}
                                    icon={icon}
                                    onClick={key_map[action]}
                                    className={cx(classes.touchButton, classes.arrow)}
                                />
                            ))
                        }
                    </Box>
                </Box>
                <Box
                    className={classes.item}
                >
                    <Box
                        className={classes.arrows}
                    >
                        <TouchButton
                            icon={<RotateRightIcon />}
                            onClick={key_map[KEY_MAP.DOWN]}
                            className={cx(classes.touchButton, classes.arrow)}
                        />
                    </Box>
                </Box>
            </Box>
        )
    }

}

export default connect(
    store => {
        return {
            key_map: store.tetris.key_map || {},
        }
    },
    null
)(withStyles(styles)(MobileBar));
