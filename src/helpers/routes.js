import React from 'react';
import { Page } from '../components';
import { SinglePlayer, MultiPlayer } from '../games/tetris';

import {
    Home,
    Tetris,
    Crocodile,
} from '../pages';

export const HOME = {
    link: '/',
    label: 'Home',
    page: props => <Home {...props} />
};

export const TETRIS = {
    link: '/tetris',
    label: 'Tetris',
    name: 'Tetris',
    description: 'Classic tetris, that you can play single or with friend.',
    page: props => <Page
        header={'Tetris'}
        component={<Tetris {...props} />}
    />
};

export const CROCODILE = {
    link: '/crocodile',
    label: 'Crocodile',
    name: 'Crocodile',
    description: 'You can guess the word that painter draws or you can be painter.',
    page: props => <Page
        header={'Crocodile'}
        component={<Crocodile {...props} />}
    />
};

export const TETRIS_SINGLE = {
    link: '/tetris/singleplayer',
    label: 'Singleplayer',
    description: 'Play with your own',
    page: props => <Page
        header={'Tetris/Single player'}
        component={<SinglePlayer {...props} />}
    />
};

export const TETRIS_ONLINE = {
    link: '/tetris/multiplayer',
    label: 'Multiplayer',
    description: 'Play vs your friend',
    page: props => <Page
        header={'Tetris/Online player'}
        component={<MultiPlayer {...props} />}
    />
};


export const ROUTES = [HOME, TETRIS, CROCODILE, TETRIS_SINGLE, TETRIS_ONLINE];
export const GAMES = [TETRIS, CROCODILE];
export const TETRIS_ROUTES = [TETRIS_SINGLE, TETRIS_ONLINE];