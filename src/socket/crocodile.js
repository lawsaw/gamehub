import { GAME_CROCODILE, META_SOCKET_EMIT } from '../helpers/constants';

const ACTION_INIT = {
    type: GAME_CROCODILE,
    meta: { remote: META_SOCKET_EMIT },
};

export const VALIDATE_NICKNAME = 'VALIDATE_NICKNAME';
export function socketValidateNickname(nickname) {
    return {
        action: VALIDATE_NICKNAME,
        nickname,
        ...ACTION_INIT
    };
}

export const JOIN_ROOM = 'JOIN_ROOM';
export function socketJoinRoom(room) {
    return {
        action: JOIN_ROOM,
        room,
        ...ACTION_INIT
    };
}

export const LEAVE_ROOM = 'LEAVE_ROOM';
export function socketLeaveRoom() {
    return {
        action: LEAVE_ROOM,
        ...ACTION_INIT
    };
}

export const WORD_SELECT = 'WORD_SELECT';
export function socketWordSelect(word) {
    return {
        action: WORD_SELECT,
        word,
        ...ACTION_INIT
    };
}

export const PAINT = 'PAINT';
export function socketPaint(image) {
    return {
        action: PAINT,
        image,
        ...ACTION_INIT
    };
}

export const CHAT = 'CHAT';
export function socketChat(message) {
    return {
        action: CHAT,
        message,
        ...ACTION_INIT
    };
}

export const MESSAGE_MARK = 'MESSAGE_MARK';
export function socketMessageMark(id, value) {
    return {
        action: MESSAGE_MARK,
        id,
        value,
        ...ACTION_INIT
    };
}
