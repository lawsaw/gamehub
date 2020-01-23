export const CONNECT = 'CONNECT';
export function socketConnect(id) {
    return {
        type: CONNECT,
        payload: {
            id,
        },
    };
}

export const DISCONNECT = 'DISCONNECT';
export function socketDisconnect(id) {
    return {
        type: DISCONNECT,
        payload: {
            id,
        },
    };
}