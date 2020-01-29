import { GAME_TETRIS } from '../helpers/constants';

const ACTION_INIT = {
    type: GAME_TETRIS,
    meta: { remote: 'socket_listen' },
};

export const SOCKET_ON_LOBBY_STEP_CHANGE = 'SOCKET_ON_LOBBY_STEP_CHANGE';
export function listenStepChange(state, callback) {
    return {
        action: SOCKET_ON_LOBBY_STEP_CHANGE,
        callback,
        state,
        ...ACTION_INIT
    };
}

export const SOCKET_ON_LOBBY = 'SOCKET_ON_LOBBY';
export function listenLobby(state, callback) {
    return {
        action: SOCKET_ON_LOBBY,
        callback,
        state,
        ...ACTION_INIT
    };
}

export const SOCKET_ON_GAME = 'SOCKET_ON_GAME';
export function listenGame(state, callback) {
    return {
        action: SOCKET_ON_GAME,
        callback,
        state,
        ...ACTION_INIT
    };
}
