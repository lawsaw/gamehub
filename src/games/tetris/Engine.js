import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { MOVE_DIRECTION } from './helpers/constants';
import { storeMoveAction, moveFigure, moveFigureDown, rotateFigure } from '../../actions/tetris';
import { getPrevRotationPosition, getNextRotationPosition } from './helpers/etc';

class Engine extends PureComponent {

    constructor(props) {
        super(props);
        this.key_map = {
            'ArrowUp':    () => props.rotateFigure(getPrevRotationPosition),
            'ArrowDown':  () => props.rotateFigure(getNextRotationPosition),
            'ArrowLeft':  () => props.moveFigure(MOVE_DIRECTION.LEFT),
            'ArrowRight': () => props.moveFigure(MOVE_DIRECTION.RIGHT),
            'Space':      () => props.moveFigureDown(),
        };
    }

    componentDidMount() {
        const { storeMoveAction, moveFigureDown } = this.props;
        storeMoveAction(moveFigureDown);
        document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = (e) => {
        const { code } = e;
        const { isKeyPressAllowed } = this.props;
        if((code in this.key_map) && isKeyPressAllowed) {
            console.log(`${code} pressed`);
            this.key_map[code]();
        }
    }

    render() {
        console.log(this.props.speed);
        return null;
    }

}

export default connect(
    store => {
        return {
            isKeyPressAllowed: !store.tetris.isPause && store.tetris.isGameRunning,
            speed: store.tetris.speed,
        }
    },
    dispatch => {
        return {
            moveFigure: direction => { dispatch(moveFigure(direction)) },
            moveFigureDown: () => { dispatch(moveFigureDown()) },
            rotateFigure: getRotation => { dispatch(rotateFigure(getRotation)) },
            storeMoveAction: func => { dispatch(storeMoveAction(func)) },
        }
    }
)(Engine);