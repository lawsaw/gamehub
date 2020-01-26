import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { MOVE_DIRECTION, KEY_MAP } from './helpers/constants';
import { Results } from '../../components';
import { storeActionData, moveFigure, moveFigureDown, rotateFigure, closeResults } from '../../actions/tetris';
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
    }

    componentDidMount() {
        const { storeActionData, moveFigureDown } = this.props;
        storeActionData(moveFigureDown, this.key_map);
        document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = (e) => {
        const { code } = e;
        const { key_map } = this.props;
        if(code in key_map) key_map[code]();
    }

    render() {
        const { results, closeResults } = this.props;
        return (
            <Fragment>
                {
                    results ? <Results data={results} onClose={closeResults} /> : null
                }
            </Fragment>
        )
    }

}

export default connect(
    store => {
        const { isGameRunning, isPause, isResultModalOpen, score, key_map } = store.tetris;
        let isKeyPressingAllowed = !isPause && isGameRunning;
        return {
            key_map: isKeyPressingAllowed ? key_map : {},
            results: isResultModalOpen ? [{label: 'Your score', value: score}] : null,
        }
    },
    dispatch => {
        return {
            moveFigure: direction => { dispatch(moveFigure(direction)) },
            moveFigureDown: () => { dispatch(moveFigureDown()) },
            rotateFigure: getRotation => { dispatch(rotateFigure(getRotation)) },
            storeActionData: (moveFunc, key_map) => { dispatch(storeActionData(moveFunc, key_map)) },
            closeResults: () => { dispatch(closeResults()) },
        }
    }
)(Engine);