import { CONNECT, DISCONNECT } from "../actions/socket";

let initialState = {
    isConnected: false,
    id: null,
};

export default function room(state = initialState, action) {

    let newState;

    switch(action.type) {

        case CONNECT:
            newState = JSON.parse(JSON.stringify(state));
            newState.isConnected = true;
            newState.id = action.payload.id;
            console.log(`${action.payload.id} connected`);
            return newState;

        case DISCONNECT:
            console.log(`${action.payload.id} disconnected`);
            return initialState;

        default:
            return state;

    }

}