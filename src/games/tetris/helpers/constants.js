//export const SOCKET_SERVER = 'http://localhost:3005/';
export const SOCKET_SERVER = 'https://lawsaw-tetris-server.herokuapp.com/';
export const COL_SIZE = 30;
export const COL_SIZE_MOBILE = 20;
export const ROWS_HIDDEN = 4; //TODO it must be like the biggest figure
export const ROWS = 20 + ROWS_HIDDEN;
export const COLS = 10;
export const SPEED = 500;
export const SPEED_STEP = 30;
export const SPEED_RAISE_FOR_SCORE = 0;
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

export const KEY_MAP = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    SPACE: 'Space',
};

export const FIGURES = {
    'T': {
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
    'Z': {
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
    'S': {
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
    'Q': {
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
    'J': {
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
    'L': {
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
    'I': {
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

export const SOCKET_ON_CLIENT_CONNECT = 'SOCKET_ON_CLIENT_CONNECT';
export const SOCKET_ON_ARENA = 'SOCKET_ON_ARENA';
export const SOCKET_ON_GAME_INIT = 'SOCKET_ON_GAME_INIT';
export const SOCKET_ON_GAME_EXIT = 'SOCKET_ON_GAME_EXIT';