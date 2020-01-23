import { UPDATE_ROOM, CLEAN_ROOM } from "../actions/crocodile";
import { cloneDeep } from "lodash";
import { STATUS_MAP } from '../games/crocodile/helpers/constants';

let initialState = {
    room: {},
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
            let room = action.payload;
            newState.room = {
                ...newState.room,
                ...room,
                appStatusText: room.status ? STATUS_MAP[room.status](room) : null,
            };
            // newState.app = {
            //     ...newState.app,
            //     appStatusText: STATUS_MAP[room.status](room),
            // };
            // console.log(newState);
            return newState;

        case CLEAN_ROOM:
            return initialState;

        default:
            return state;

    }

}