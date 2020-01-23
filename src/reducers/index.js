import { combineReducers } from 'redux';

import app from './app';
import socket from './socket';
import crocodile from './crocodile';
import tetris from './tetris';

const mainReducer = combineReducers({
    app,
    socket,
    crocodile,
    tetris,
});

export default mainReducer;