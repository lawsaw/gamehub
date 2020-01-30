import { GAME_TETRIS } from '../helpers/constants';

const ACTION_INIT = {
    type: GAME_TETRIS,
    meta: { remote: 'socket_emit' },
};

export const MAKE_CONNECTION = 'MAKE_CONNECTION';
export function makeConnection(server_id) {
    return {
        action: MAKE_CONNECTION,
        server_id,
        ...ACTION_INIT,
    };
}

export const SEND_MOVE = 'SEND_MOVE';
export function sendMove(data) {
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
