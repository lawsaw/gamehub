export const UPDATE_ROOM = 'UPDATE_ROOM';
export function updateRoom(room) {
    return {
        type: UPDATE_ROOM,
        payload: room,
    };
}

export const CLEAN_ROOM = 'CLEAN_ROOM';
export function cleanRoom(room) {
    return {
        type: CLEAN_ROOM,
    };
}