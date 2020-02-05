import { GAME_TETRIS, META_SOCKET_EMIT } from '../helpers/constants';
import { stopGame, resetConfig } from "../actions/tetris";

const ACTION_INIT = {
    type: GAME_TETRIS,
    meta: { remote: META_SOCKET_EMIT },
};

export const MAKE_CONNECTION = 'MAKE_CONNECTION';
export function socketMakeConnection(server_id) {
    return {
        action: MAKE_CONNECTION,
        server_id,
        ...ACTION_INIT,
    };
}

export const SEND_MOVE = 'SEND_MOVE';
export function socketSendMove(data) {
    return {
        action: SEND_MOVE,
        ...data,
        ...ACTION_INIT,
    };
}

export const VALIDATE_NICKNAME = 'VALIDATE_NICKNAME';
export function socketValidateNickname(nickname) {
    return {
        action: VALIDATE_NICKNAME,
        nickname,
        ...ACTION_INIT
    };
}

export const SEND_BUTTON_ACTION = 'SEND_BUTTON_ACTION';
export function socketSendButtonAction(button_action) {
    return {
        action: SEND_BUTTON_ACTION,
        button_action,
        ...ACTION_INIT
    };
}

export const DISCONNECT = 'DISCONNECT';
export function socketDisconnect() {
    return {
        action: DISCONNECT,
        ...ACTION_INIT
    };
}

export const GAME_FINISH = 'GAME_FINISH';
export function socketGameFinish() {
    return {
        action: GAME_FINISH,
        ...ACTION_INIT
    };
}

export const GAME_RESET = 'GAME_RESET';
export function socketGameReset() {
    return dispatch => {
        dispatch( stopGame() );
        dispatch( socketMakeConnection() );
    };
}

export const GAME_DISCONNECT = 'GAME_DISCONNECT';
export function socketGameDisconnect() {
    return dispatch => {
        dispatch( stopGame() );
        dispatch( resetConfig() );
    };
}
