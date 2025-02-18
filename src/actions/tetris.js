export const SET_SPEED = 'SET_SPEED';
export function setSpeed(speed) {
    return {
        type: SET_SPEED,
        payload: {
            speed
        },
    };
}

export const MOVE_FIGURE = 'MOVE_FIGURE';
export function moveFigure(direction) {
    return {
        type: MOVE_FIGURE,
        payload: {
            direction,
        },
    };
}

export const MOVE_FIGURE_DOWN = 'MOVE_FIGURE_DOWN';
export function moveFigureDown() {
    return {
        type: MOVE_FIGURE_DOWN,
    };
}

export const START_NEW_GAME = 'START_NEW_GAME';
export function startNewGame() {
    return {
        type: START_NEW_GAME,
    };
}

export const START_NEW_GAME_AND_MOVE = 'START_NEW_GAME_AND_MOVE';
export function startNewGameAndMove() {
    return dispatch => {
        dispatch( startNewGame() );
        dispatch( startMoving() );
    }
}

export const STOP_GAME = 'STOP_GAME';
export function stopGame() {
    return {
        type: STOP_GAME,
    };
}

export const START_MOVING = 'START_MOVING';
export function startMoving() {
    return {
        type: START_MOVING,
    };
}

export const STOP_MOVING = 'STOP_MOVING';
export function stopMoving() {
    return {
        type: STOP_MOVING,
    };
}

export const ROTATE_FIGURE = 'ROTATE_FIGURE';
export function rotateFigure(getRotation) {
    return {
        type: ROTATE_FIGURE,
        payload: {
            getRotation
        },
    };
}

export const STORE_ACTION_DATA = 'STORE_ACTION_DATA';
export function storeActionData(moveFunc, key_map) {
    return {
        type: STORE_ACTION_DATA,
        payload: {
            moveFunc,
            key_map
        },
    };
}

export const CLOSE_RESULTS = 'CLOSE_RESULTS';
export function closeResults(func) {
    return {
        type: CLOSE_RESULTS,
    };
}

export const UPDATE_OPPONENT = 'UPDATE_OPPONENT';
export function updateOpponent(opponent) {
    return {
        type: UPDATE_OPPONENT,
        payload: {
            opponent,
        },
    };
}

export const UPDATE_CONFIG = 'UPDATE_CONFIG';
export function updateConfig(config) {
    return {
        type: UPDATE_CONFIG,
        payload: {
            config,
        },
    };
}

export const RESET_CONFIG = 'RESET_CONFIG';
export function resetConfig() {
    return {
        type: RESET_CONFIG,
    };
}

export const SHOW_RESULTS = 'SHOW_RESULTS';
export function showResults() {
    return {
        type: SHOW_RESULTS,
    };
}