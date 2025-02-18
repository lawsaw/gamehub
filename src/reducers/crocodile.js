import { UPDATE_ROOM, CLEAN_ROOM, UPDATE_CONFIG, RESET_CONFIG, UPDATE_ROOM_LIST } from "../actions/crocodile";
import { cloneDeep } from "lodash";

let initialConfig = {
    nickname: '',
    step: 'LOBBY_STEP_NICKNAME',
};

let initialState = {
    room: {},
    rooms: [],
    config: {
        ...initialConfig,
    },
    // app: {
    //     appStatusText: null,
    //     appHeader: null,
    //     appTopAction: null,
    // }
};

export default function room(state = initialState, action) {

    let newState;

    switch(action.type) {

        case UPDATE_ROOM:
            newState = cloneDeep(state);
            let room = action.payload.room;
            newState.room = {
                ...newState.room,
                ...room,
                //appStatusText: room.status ? STATUS_MAP[room.status](room) : null,
            };
            // newState.app = {
            //     ...newState.app,
            //     appStatusText: STATUS_MAP[room.status](room),
            // };
            // console.log(newState);
            return newState;

        case CLEAN_ROOM:
            return {
                ...initialState,
                config: {
                    ...state.config,
                    step: 'LOBBY_STEP_ROOM_SELECTION',
                }
            };

        case UPDATE_CONFIG:
            return {
                ...state,
                config: {
                    ...state.config,
                    ...action.payload.config
                }
            }

        case RESET_CONFIG:
            return {
                ...state,
                config: {
                    ...initialConfig,
                    nickname: state.config.nickname,
                }
            }

        case UPDATE_ROOM_LIST:
            return {
                ...state,
                rooms: action.payload.rooms
            }

        default:
            return state;

    }

}