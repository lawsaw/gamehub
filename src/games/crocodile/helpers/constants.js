export const LOBBY_STEP_NICKNAME = 'LOBBY_STEP_NICKNAME';
export const LOBBY_STEP_ROOM_SELECTION = 'LOBBY_STEP_ROOM_SELECTION';

export const SOCKET_ON_LOBBY_STEP_CHANGE = 'SOCKET_ON_LOBBY_STEP_CHANGE';
//export const SOCKET_ON_NICKNAME_VALIDATE = 'SOCKET_ON_NICKNAME_VALIDATE';
export const SOCKET_ON_ROOM_LIST = 'SOCKET_ON_ROOM_LIST';
export const SOCKET_ON_ROOM_ADD = 'SOCKET_ON_ROOM_ADD';
export const SOCKET_ON_ROOM_JOIN = 'SOCKET_ON_ROOM_JOIN';
export const SOCKET_ON_ROOM_LEAVE = 'SOCKET_ON_ROOM_LEAVE';
export const SOCKET_ON_ROOM = 'SOCKET_ON_ROOM';
export const SOCKET_ON_CHAT = 'SOCKET_ON_CHAT';
export const SOCKET_ON_WORD_SELECT = 'SOCKET_ON_WORD_SELECT';
export const SOCKET_ON_PAINT = 'SOCKET_ON_PAINT';
export const SOCKET_ON_MESSAGE_LIKE = 'SOCKET_ON_MESSAGE_LIKE';

export const ROOM_STATUS_WAITING = 'ROOM_STATUS_WAITING';
export const ROOM_STATUS_PAINTER_SELECTING = 'ROOM_STATUS_PAINTER_SELECTING';
export const ROOM_STATUS_WORD_SELECTING = 'ROOM_STATUS_WORD_SELECTING';
export const ROOM_STATUS_DRAWING = 'ROOM_STATUS_DRAWING';
export const ROOM_STATUS_GAME_FINISHED = 'ROOM_STATUS_GAME_FINISHED';

export const THUMB_STATUS_LIKE = 'THUMB_STATUS_LIKE';
export const THUMB_STATUS_DISLIKE = 'THUMB_STATUS_DISLIKE';

export const STATUS_MAP = {
    [ROOM_STATUS_WAITING]: () => `We need more players (2 minimum)`,
    [ROOM_STATUS_PAINTER_SELECTING]: ({ countdown }) => `Painter is being selected in ${countdown} (random)`,
    [ROOM_STATUS_WORD_SELECTING]: ({ painter }) => `Painter ${painter.nickname} is selecting a word`,
    [ROOM_STATUS_DRAWING]: ({ painter }) => `${painter.nickname} is drawing`,
    [ROOM_STATUS_GAME_FINISHED]: ({ winner }) => `The game is over. ${winner.nickname} wins`,
};

export const DESK_WIDTH = 600;
export const DESK_HEIGHT = 500;