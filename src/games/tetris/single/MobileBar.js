import React, { createRef, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import RotateLeft from '@material-ui/icons/RotateLeft';
import { connect } from 'react-redux';
import { withStyles, Box } from "@material-ui/core";
import { KEY_MAP } from '../helpers/constants';
import { Fab } from '../components';
//import { pressingRule } from "../helpers/etc";

const ARROW_SIZE = 60;

const styles = () => ({
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
        borderRadius: '100%',
    },
    arrow_left: {
        top: 0,
        left: '-100%',
    },
    arrow_right: {
        top: 0,
        right: '-100%',
    },
    arrow_down: {
        bottom: '-100%',
    },
    arrow_center: {
        top: 0,
        left: 0,
    },
    arrow_rightCenter: {
        top: '50%',
        right: '-100%',
    },
});

const ARROWS_MAP = [
    {
        icon: <KeyboardArrowLeft />,
        action: KEY_MAP.LEFT,
        position: 'left',
    },{
        icon: <KeyboardArrowRight />,
        action: KEY_MAP.RIGHT,
        position: 'right',
    },{
        icon: <KeyboardArrowDown />,
        action: KEY_MAP.SPACE,
        position: 'down',
    }
];

class MobileBar extends PureComponent {

    constructor(props) {
        super(props);
        this.ref_map = {
            [KEY_MAP.LEFT]: createRef(),
            [KEY_MAP.RIGHT]: createRef(),
            [KEY_MAP.SPACE]: createRef(),
            [KEY_MAP.UP]: createRef(),
        }
        // this.listener_map = {};
        // this.pressingFunc = null;
        // this.is_loaded = false;
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(!this.is_loaded && this.props.key_map !== null) {
    //         this.init();
    //         this.is_loaded = true;
    //     }
    // }

    // componentWillUnmount() {
    //     for(let code in this.ref_map) {
    //         let button = ReactDOM.findDOMNode(this.ref_map[code].current);
    //         button.removeEventListener('mousedown', this.listener_map[code].onDown, false);
    //         button.removeEventListener('touchstart', this.listener_map[code].onDown, false);
    //         button.removeEventListener('mouseup', this.listener_map[code].onUp, false);
    //         button.removeEventListener('touchend', this.listener_map[code].onUp, false);
    //         button.removeEventListener('touchcancel', this.listener_map[code].onUp, false);
    //     }
    // }

    // init = () => {
    //     const { key_map } = this.props;
    //     this.pressingFunc = pressingRule(key_map);
    //     for(let code in this.ref_map) {
    //         let button = ReactDOM.findDOMNode(this.ref_map[code].current);
    //         this.listener_map[code] = {};
    //         this.listener_map[code].onDown = this.handleMouseDown(code);
    //         this.listener_map[code].onUp = this.handleMouseUp(code);
    //         button.addEventListener('mousedown', this.listener_map[code].onDown, false);
    //         button.addEventListener('touchstart', this.listener_map[code].onDown, false);
    //         button.addEventListener('mouseup', this.listener_map[code].onUp, false);
    //         button.addEventListener('touchend', this.listener_map[code].onUp, false);
    //         button.addEventListener('touchcancel', this.listener_map[code].onUp, false);
    //     }
    // }

    // handleMouseDown = code => {
    //     return () => this.pressingFunc.startInterval(code);
    // }
    //
    // handleMouseUp = code => {
    //     return () => this.pressingFunc.stopInterval(code);
    // }

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
                            ARROWS_MAP.map(({ icon, action, position }, index) => (
                                <Fab
                                    key={index}
                                    icon={icon}
                                    onClick={key_map[action]}
                                    className={cx(classes.touchButton, classes[`arrow`], classes[`arrow_${position}`])}
                                    ref={this.ref_map[action]}
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
                        <Fab
                            icon={<RotateLeft />}
                            onClick={key_map[KEY_MAP.UP]}
                            className={cx(classes.touchButton, classes.arrow, classes.arrow_rightCenter)}
                            ref={this.ref_map[KEY_MAP.UP]}
                        />
                    </Box>
                </Box>
            </Box>
        )
    }

}

export default connect(
    store => {
        const { isGameRunning, isPause, key_map } = store.tetris;
        let isKeyPressingAllowed = !isPause && isGameRunning;
        return {
            key_map: isKeyPressingAllowed ? key_map : {},
            //key_map
        }
    },
    null
)(withStyles(styles)(MobileBar));
