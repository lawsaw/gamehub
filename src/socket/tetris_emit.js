import { GAME_TETRIS } from '../helpers/constants';

const ACTION_INIT = {
    type: GAME_TETRIS,
    meta: { remote: 'socket_emit' },
};

export const SOCKET_ON_CLIENT_CONNECT = 'SOCKET_ON_CLIENT_CONNECT';
export function makeConnection({ server_id }) {
    return {
        action: SOCKET_ON_CLIENT_CONNECT,
        server_id,
        ...ACTION_INIT,
    };
}

export const SEND_MOVE = 'SEND_MOVE';
export function sendMove({ field, preview }) {
    return {
        action: SEND_MOVE,
        field,
        preview,
        ...ACTION_INIT,
    };
}

export const VALIDATE_NICKNAME = 'VALIDATE_NICKNAME';
export function socketValidateNickname({ nickname }) {
    return {
        action: VALIDATE_NICKNAME,
        nickname,
        ...ACTION_INIT
    };
}
