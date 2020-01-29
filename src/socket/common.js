import { GAME_TETRIS } from '../helpers/constants';

const ACTION_INIT = {
    meta: { remote: 'socket_emit' },
};

export const VALIDATE_NICKNAME = 'VALIDATE_NICKNAME';
export function socketValidateNickname({ nickname, onSuccess }) {
    return {
        type: 'COMMON',
        action: VALIDATE_NICKNAME,
        meta: {remote: 'socket_emit'},
        nickname,
        onSuccess
    };
}