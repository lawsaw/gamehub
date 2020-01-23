export const SET_APP = 'SET_APP';
export function setApp(app) {
    return {
        type: SET_APP,
        payload: app,
    };
}

export const CLEAN_APP = 'CLEAN_APP';
export function cleanApp() {
    return {
        type: CLEAN_APP,
    };
}