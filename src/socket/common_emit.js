import { COMMON } from '../helpers/constants';

const ACTION_INIT = {
    type: COMMON,
    meta: { remote: 'socket_emit' },
};

export const VALIDATE_NICKNAME = 'VALIDATE_NICKNAME';
export function socketValidateNickname({ nickname, onSuccess }) {
    return {
        action: VALIDATE_NICKNAME,
        nickname,
        onSuccess,
        ...ACTION_INIT
    };
}