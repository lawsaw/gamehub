import { COMMON_ACTIONS, META_SOCKET_EMIT } from '../helpers/constants';

const ACTION_INIT = {
    type: COMMON_ACTIONS,
    meta: { remote: META_SOCKET_EMIT },
};

export const UPDATE_USER = 'UPDATE_USER';
export function socketUpdateUser(data) {
    return {
        action: UPDATE_USER,
        ...data,
        ...ACTION_INIT,
    };
}