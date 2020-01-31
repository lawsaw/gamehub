import { SET_APP, CLEAN_APP } from "../actions/app";

let initialState = {
    header: null,
    sub_header: null,
    topAction: null,
};

export default function room(state = initialState, action) {

    let newState;

    switch(action.type) {

        case SET_APP:
            newState = {
                ...state,
                ...action.payload
            };
            //console.log(newState);
            return newState;

        case CLEAN_APP:
            return initialState;

        default:
            return state;

    }

}