export const UPDATE_ROOM = 'UPDATE_ROOM';
export function updateRoom(room) {
    return {
        type: UPDATE_ROOM,
        payload: {
            room
        },
    };
}

export const CLEAN_ROOM = 'CLEAN_ROOM';
export function cleanRoom() {
    return {
        type: CLEAN_ROOM,
    };
}

export const UPDATE_CONFIG = 'UPDATE_CONFIG';
export function updateConfig(config) {
    return {
        type: UPDATE_CONFIG,
        payload: {
            config,
        },
    };
}

export const RESET_CONFIG = 'RESET_CONFIG';
export function resetConfig() {
    return {
        type: RESET_CONFIG,
    };
}

export const UPDATE_ROOM_LIST = 'UPDATE_ROOM_LIST';
export function updateRoomList(rooms) {
    return {
        type: UPDATE_ROOM_LIST,
        payload: {
            rooms
        },
    };
}