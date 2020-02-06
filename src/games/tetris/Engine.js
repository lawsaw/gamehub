import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { MOVE_DIRECTION, KEY_MAP } from './helpers/constants';
import { storeActionData, moveFigure, moveFigureDown, rotateFigure } from '../../actions/tetris';
import { getPrevRotationPosition, getNextRotationPosition } from './helpers/etc';

class Engine extends PureComponent {

    constructor(props) {
        super(props);
        this.key_map = {
            [KEY_MAP.UP]:    () => props.rotateFigure(getPrevRotationPosition),
            [KEY_MAP.DOWN]:  () => props.rotateFigure(getNextRotationPosition),
            [KEY_MAP.LEFT]:  () => props.moveFigure(MOVE_DIRECTION.LEFT),
            [KEY_MAP.RIGHT]: () => props.moveFigure(MOVE_DIRECTION.RIGHT),
            [KEY_MAP.SPACE]: () => props.moveFigureDown(),
        };
        this.lock = {
            inner: false,
            outer: false,
        };
        this.timer = null;
    }

    componentDidMount() {
        const { storeActionData, moveFigureDown } = this.props;
        storeActionData(moveFigureDown, this.key_map);
        document.addEventListener('keydown', this.handleKeyPressDown);
        document.addEventListener('keyup', this.handleKeyPressUp);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPressDown);
        document.removeEventListener('keyup', this.handleKeyPressUp);
    }

    doPeriodic = (func) => {
        if(this.lock.inner) return false;
        if(!this.lock.outer) func();
        this.lock.inner = true;
        this.timer = setTimeout(() => {
            func();
            this.lock.inner = false;
        }, 100);
    }

    handleKeyPressDown = (e) => {
        const { code } = e;
        const { key_map } = this.props;
        if(code in key_map) {
            this.doPeriodic( () => key_map[code]() );
        }
        if(!this.lock.outer) this.lock.outer = true;
    }

    handleKeyPressUp = (e) => {
        const { code } = e;
        const { key_map } = this.props;
        if(code in key_map) {
            clearTimeout(this.timer);
            this.lock.inner = false;
            this.lock.outer = false;
        }
    }

    render() {
        return null
    }

}

export default connect(
    store => {
        const { isGameRunning, isPause, key_map } = store.tetris;
        let isKeyPressingAllowed = !isPause && isGameRunning;
        return {
            key_map: isKeyPressingAllowed ? key_map : {},
        }
    },
    dispatch => {
        return {
            moveFigure: direction => { dispatch(moveFigure(direction)) },
            moveFigureDown: () => { dispatch(moveFigureDown()) },
            rotateFigure: getRotation => { dispatch(rotateFigure(getRotation)) },
            storeActionData: (moveFunc, key_map) => { dispatch(storeActionData(moveFunc, key_map)) },
        }
    }
)(Engine);