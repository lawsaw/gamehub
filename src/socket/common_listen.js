import { COMMON } from '../helpers/constants';

const ACTION_INIT = {
    type: COMMON,
    meta: { remote: 'socket_listen' },
};

export const CONNECT = 'connect';
export function listenConnect(state, callback) {
    return {
        action: CONNECT,
        callback,
        state,
        ...ACTION_INIT
    };
}

export const DISCONNECT = 'disconnect';
export function listenDisconnect(state, callback) {
    return {
        action: DISCONNECT,
        callback,
        state,
        ...ACTION_INIT
    };
}

export const SOCKET_MESSAGE = 'SOCKET_MESSAGE';
export function listenMessage(state, callback) {
    return {
        action: SOCKET_MESSAGE,
        callback,
        state,
        ...ACTION_INIT
    };
}