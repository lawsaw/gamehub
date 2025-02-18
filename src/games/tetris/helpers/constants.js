export const COL_SIZE = 30;
export const COL_SIZE_MOBILE = 20;
export const ROWS_HIDDEN = 4; //TODO it must be like the biggest figure
export const ROWS = 20 + ROWS_HIDDEN;
export const COLS = 10;
export const SPEED = 250;
export const SPEED_STEP = 10;
export const SPEED_RAISE_FOR_SCORE = 1;
export const POSITION = [0, COLS/2-1];

export const MOVE_DIRECTION_LEFT = 'MOVE_DIRECTION_LEFT';
export const MOVE_DIRECTION_RIGHT = 'MOVE_DIRECTION_RIGHT';
export const MOVE_DIRECTION_UP = 'MOVE_DIRECTION_UP';
export const MOVE_DIRECTION_DOWN = 'MOVE_DIRECTION_DOWN';

export const MOVE_DIRECTION = {
    LEFT: MOVE_DIRECTION_LEFT,
    RIGHT: MOVE_DIRECTION_RIGHT,
    UP: MOVE_DIRECTION_UP,
    DOWN: MOVE_DIRECTION_DOWN,
};

export const ROTATION_CIRCLE = [MOVE_DIRECTION.UP, MOVE_DIRECTION.RIGHT, MOVE_DIRECTION.DOWN, MOVE_DIRECTION.LEFT];

export const MOVE_STEP_MAP = {
    [MOVE_DIRECTION.DOWN]: ([row, col]) => ([row + 1, col]),
    [MOVE_DIRECTION.LEFT]: ([row, col]) => ([row, col - 1]),
    [MOVE_DIRECTION.RIGHT]: ([row, col]) => ([row, col + 1]),
};

export const LOBBY_STEP_NICKNAME = 'LOBBY_STEP_NICKNAME';
export const LOBBY_STEP_TYPE_SELECTING = 'LOBBY_STEP_TYPE_SELECTING';
export const LOBBY_STEP_CONNECTION = 'LOBBY_STEP_CONNECTION';

export const KEY_MAP = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    SPACE: 'Space',
};

export const SYMBOLS = {
    T: 'T',
    Z: 'Z',
    S: 'S',
    Q: 'Q',
    J: 'J',
    L: 'L',
    I: 'I',
};

export const FIGURES = {
    [SYMBOLS.T]: {
        [MOVE_DIRECTION.UP]: [
            [0,1,0],
            [1,1,1],
        ],
        [MOVE_DIRECTION.DOWN]: [
            [1,1,1],
            [0,1,0],
        ],
        [MOVE_DIRECTION.LEFT]: [
            [0,1],
            [1,1],
            [0,1],
        ],
        [MOVE_DIRECTION.RIGHT]: [
            [1,0],
            [1,1],
            [1,0],
        ],
    },
    [SYMBOLS.Z]: {
        [MOVE_DIRECTION.UP]: [
            [0,1],
            [1,1],
            [1,0],
        ],
        [MOVE_DIRECTION.DOWN]: [
            [0,1],
            [1,1],
            [1,0],
        ],
        [MOVE_DIRECTION.LEFT]: [
            [1,1,0],
            [0,1,1],
        ],
        [MOVE_DIRECTION.RIGHT]: [
            [1,1,0],
            [0,1,1],
        ],
    },
    [SYMBOLS.S]: {
        [MOVE_DIRECTION.UP]: [
            [1,0],
            [1,1],
            [0,1],
        ],
        [MOVE_DIRECTION.DOWN]: [
            [1,0],
            [1,1],
            [0,1],
        ],
        [MOVE_DIRECTION.LEFT]: [
            [0,1,1],
            [1,1,0],
        ],
        [MOVE_DIRECTION.RIGHT]: [
            [0,1,1],
            [1,1,0],
        ],
    },
    [SYMBOLS.Q]: {
        [MOVE_DIRECTION.UP]: [
            [1,1],
            [1,1],
        ],
        [MOVE_DIRECTION.DOWN]: [
            [1,1],
            [1,1],
        ],
        [MOVE_DIRECTION.LEFT]: [
            [1,1],
            [1,1],
        ],
        [MOVE_DIRECTION.RIGHT]: [
            [1,1],
            [1,1],
        ],
    },
    [SYMBOLS.J]: {
        [MOVE_DIRECTION.UP]: [
            [1,1],
            [1,0],
            [1,0],
        ],
        [MOVE_DIRECTION.DOWN]: [
            [0,1],
            [0,1],
            [1,1],
        ],
        [MOVE_DIRECTION.LEFT]: [
            [1,0,0],
            [1,1,1],
        ],
        [MOVE_DIRECTION.RIGHT]: [
            [1,1,1],
            [0,0,1],
        ],
    },
    [SYMBOLS.L]: {
        [MOVE_DIRECTION.UP]: [
            [1,1],
            [0,1],
            [0,1],
        ],
        [MOVE_DIRECTION.DOWN]: [
            [1,0],
            [1,0],
            [1,1],
        ],
        [MOVE_DIRECTION.LEFT]: [
            [1,1,1],
            [1,0,0],
        ],
        [MOVE_DIRECTION.RIGHT]: [
            [0,0,1],
            [1,1,1],
        ],
    },
    [SYMBOLS.I]: {
        [MOVE_DIRECTION.UP]: [
            [1],
            [1],
            [1],
            [1],
        ],
        [MOVE_DIRECTION.DOWN]: [
            [1],
            [1],
            [1],
            [1],
        ],
        [MOVE_DIRECTION.LEFT]: [
            [1,1,1,1],
        ],
        [MOVE_DIRECTION.RIGHT]: [
            [1,1,1,1],
        ],
    }
};