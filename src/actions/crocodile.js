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

export const UPDATE_CONFIG_2 = 'UPDATE_CONFIG_2';
export function updateConfig(config) {
    return {
        type: UPDATE_CONFIG_2,
        payload: {
            config,
        },
    };
}

export const RESET_CONFIG_2 = 'RESET_CONFIG_2';
export function resetConfig() {
    return {
        type: RESET_CONFIG_2,
    };
}

export const UPDATE_ROOM_LIST = 'UPDATE_ROOM_LIST';
export function updateRoomList(rooms) {
    return {
        type: UPDATE_ROOM_LIST,
        payload: rooms,
    };
}

// export const UPDATE_ROOM = 'UPDATE_ROOM';
// export function updateRoomList({ room }) {
//     return {
//         type: UPDATE_ROOM,
//         payload: {
//             room,
//         },
//     };
// }