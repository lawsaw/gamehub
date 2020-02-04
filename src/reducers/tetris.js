import { SET_SPEED, MOVE_FIGURE, START_NEW_GAME, STOP_GAME, START_MOVING, STOP_MOVING, MOVE_FIGURE_DOWN, ROTATE_FIGURE, STORE_ACTION_DATA, CLOSE_RESULTS, UPDATE_OPPONENT, UPDATE_CONFIG, RESET_CONFIG, SHOW_RESULTS } from "../actions/tetris";
import { COLS, ROWS, POSITION, SPEED, MOVE_STEP_MAP, ROWS_HIDDEN, MOVE_DIRECTION } from "../games/tetris/helpers/constants";
import {
    generateGrid,
    renderDemoHouse,
    getRandomRotation,
    getRandomFigure,
    merge,
    getAllFullRowsIndexes,
    cleanTableFromFullRows,
    getScoreOptimalSpeed,
    getFigureMap,
    hasTablesConflict
} from "../games/tetris/helpers/etc";

let hasFigureRightToMove = (position, store) => {
    const { table, figure, rotation } = store;
    if(!isPositionInArea(position, rotation, store)) return false;
    let figureMap = getFigureMap(figure[rotation], position);
    return hasTablesConflict(table, figureMap);
};

let isPositionInArea = (position, rotation, store) => {
    let [row, col] = position;
    const { figure } = store;
    let rowLimit = row + figure[rotation].length;
    let colLimit = col + figure[rotation][0].length;
    return rowLimit <= ROWS && colLimit <= COLS;
};

let isEndGame = (store) => {
    const { table } = store;
    let checkedRow = table[ROWS_HIDDEN - 1];
    return checkedRow.find(col => col === 1);
};

let isFigureCloseToRight = (store) => {
    const { position, rotation, table, figure } = store;
    let colPosition = position[1];
    return colPosition < (table[0].length - figure[rotation][0].length);
};

let isFigureCloseToLeft = (store) => {
    const { position } = store;
    let colPosition = position[1];
    return colPosition - 1 >= 0;
};




let getFigureRotatePosition = (rotation, store) => {
    const { position } = store;
    let [rowPosition, colPosition] = position;
    let figureOutsideSpace = getFigureOutsideSpace(rotation, store);
    return figureOutsideSpace < 0 ? [rowPosition, colPosition+figureOutsideSpace] : [rowPosition, colPosition];
};

let getFigureOutsideSpace = (rotation, store) => {
    const { position, table, figure } = store;
    let colPosition = position[1];
    let tableRowLength = table[0].length;
    let currentFigureLength = figure[rotation][0].length;
    return tableRowLength - (colPosition + currentFigureLength);
};

let hasFigureRightToRotate = (position, rotation, store) => {
    const { table } = store;
    if(!isPositionInArea(position, rotation, store)) return false;
    let figureMap = getFigureFullGrid(store);
    return hasTablesConflict(table, figureMap);
};

let getFigureFullGrid = (store) => {
    const { figure, position, rotation } = store;
    let rows = figure[rotation].length;
    let cols = figure[rotation][0].length;
    let size = rows > cols ? rows : cols;
    let figureSquare = Array.from({ length: size }, () => Array.from({ length: size }, () => 1));
    return getFigureMap(figureSquare, position);
};

let initialConfig = {
    nickname: '',
    type: 'TYPE_CLIENT',
    step: 'LOBBY_STEP_NICKNAME',
};

let initialState = {
    table: renderDemoHouse(generateGrid(COLS, ROWS)),
    rotation: getRandomRotation(),
    rotationNext: getRandomRotation(),
    figure: getRandomFigure(),
    figureNext: getRandomFigure(),
    position: POSITION,
    speed: SPEED,
    score: 0,
    isPause: true,
    isGameRunning: false,
    isResultModalOpen: false,
    moveAction: null,
    key_map: null,
    opponent: null,
    config: {
        ...initialConfig,
    },
};

const MOVE_RULE = {
    [MOVE_DIRECTION.LEFT]: store => isFigureCloseToLeft(store),
    [MOVE_DIRECTION.RIGHT]: store => isFigureCloseToRight(store),
};

let timer = null;

let setTimer = (speed, store) => {
    clearInterval(timer);
    timer = setInterval(() => {
        store.moveAction();
    }, speed);
};

export default function room(state = initialState, action) {

    //let newState;

    switch(action.type) {

        case SET_SPEED:
            return {
                ...state,
                speed: action.payload.speed,
            };

        case MOVE_FIGURE:
            let direction = action.payload.direction;
            let positionNext = MOVE_STEP_MAP[direction](state.position);
            if(direction in MOVE_RULE && !MOVE_RULE[direction](state, action.payload.rotation)) return state;
            return hasFigureRightToMove(positionNext, state) ? {
                ...state,
                position: positionNext,
            } : state;

        case START_NEW_GAME:
            clearInterval(timer);
            return {
                ...state,
                isResultModalOpen: false,
                table: generateGrid(COLS, ROWS),
                figure: getRandomFigure(),
                figureNext: getRandomFigure(),
                position: POSITION,
                rotation: getRandomRotation(),
                rotationNext: getRandomRotation(),
                score: 0,
                isPause: false,
                isGameRunning: true,
                speed: SPEED,
            };

        case STOP_GAME:
            clearInterval(timer);
            return {
                ...initialState,
                moveAction: state.moveAction,
                key_map: state.key_map,
                config: state.config,
                opponent: state.opponent,
            };

        case START_MOVING:
            setTimer(state.speed, state);
            return {
                ...state,
                isPause: false,
            };

        case STOP_MOVING:
            clearInterval(timer);
            return {
                ...state,
                isPause: true,
            };

        case MOVE_FIGURE_DOWN:
            let positionNext2 = MOVE_STEP_MAP[MOVE_DIRECTION.DOWN](state.position);
            if(hasFigureRightToMove(positionNext2, state)) {
                return {
                    ...state,
                    position: positionNext2,
                };
            } else {
                if(!isEndGame(state)) {
                    let tableWithFigure = merge(state.figure[state.rotation], state.position, state.table);
                    let fullRows = getAllFullRowsIndexes(tableWithFigure);
                    let scoreNew = state.score + fullRows.length;
                    let speedNew = state.speed;
                    if(fullRows.length) {
                        tableWithFigure = cleanTableFromFullRows(tableWithFigure, fullRows);
                        speedNew = getScoreOptimalSpeed(scoreNew, state.speed);
                    }
                    setTimer(speedNew, state);
                    return {
                        ...state,
                        table: tableWithFigure,
                        score: scoreNew,
                        speed: speedNew,
                        figure: state.figureNext,
                        figureNext: getRandomFigure(),
                        position: POSITION,
                        rotation: state.rotationNext,
                        rotationNext: getRandomRotation(),
                    };
                } else {
                    clearInterval(timer);
                    return {
                        ...state,
                        isResultModalOpen: true,
                        isGameRunning: false,
                        speed: SPEED,
                    }
                }
            }

        case ROTATE_FIGURE:
            let rotationNew = action.payload.getRotation(state.rotation);
            let positionNew = getFigureRotatePosition(rotationNew, state);
            return hasFigureRightToRotate(positionNew, rotationNew, state) ? {
                ...state,
                position: positionNew,
                rotation: rotationNew,
            } : state;

        case STORE_ACTION_DATA:
            return {
                ...state,
                moveAction: action.payload.moveFunc,
                key_map: action.payload.key_map,
            };

        case CLOSE_RESULTS:
            return {
                ...state,
                isResultModalOpen: false,
            };

        case UPDATE_OPPONENT:
            return {
                ...state,
                opponent: {
                    ...state.opponent,
                    ...action.payload.opponent,
                },
            };

        case UPDATE_CONFIG:
            return {
                ...state,
                config: {
                    ...state.config,
                    ...action.payload.config
                }
            }

        case RESET_CONFIG:
            return {
                ...state,
                opponent: null,
                config: {
                    ...initialConfig,
                    nickname: state.config.nickname,
                }
            }

        case SHOW_RESULTS:
            clearInterval(timer);
            return {
                ...state,
                isResultModalOpen: true,
                isGameRunning: false,
            }

        default:
            return state;

    }

}