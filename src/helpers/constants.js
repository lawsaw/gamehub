//export const SOCKET_SERVER = 'http://localhost:3005/';
export const SOCKET_SERVER = 'http://192.168.100.158:3005/';
//export const SOCKET_SERVER = 'https://lawsaw-crocodile.herokuapp.com/';

export const SOCKET_MESSAGE = 'SOCKET_MESSAGE';

export const SOCKET_CLIENT = 'SOCKET_CLIENT';

export const GAME_CROCODILE = 'GAME_CROCODILE';
export const GAME_TETRIS = 'GAME_TETRIS';
export const COMMON = 'COMMON';

export const SOCKET_MAP = [
    {
        game: 'COMMON',
        method: 'emitCommon',
    },
    {
        game: 'GAME_CROCODILE',
        method: 'emitCrocodile',
    },{
        game: 'GAME_TETRIS',
        method: 'emitTetris',
    }
];

export const SOCKET_ON_NICKNAME_VALIDATE = 'SOCKET_ON_NICKNAME_VALIDATE';
export const SOCKET_ON_LOBBY_STEP_CHANGE = 'SOCKET_ON_LOBBY_STEP_CHANGE';