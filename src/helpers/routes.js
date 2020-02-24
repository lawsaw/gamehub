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
    description: 'Use ←, ↑, →, ↓ and SPACE keys to move figures',
    page: props => <Page
        header={'Tetris'}
        component={<Tetris {...props} />}
    />
};

export const CROCODILE = {
    link: '/crocodile',
    label: 'Crocodile',
    description: 'Do your best to draw the meaning of the word or be the first to guess the word that the painter is drawing.',
    page: props => <Page
        header={'Crocodile'}
        component={<Crocodile {...props} />}
    />
};

export const TETRIS_SINGLE = {
    link: '/tetris/single',
    label: 'Singleplayer',
    description: 'Play with your own',
    page: props => <Page
        header={`${TETRIS.label}/single`}
        component={<SinglePlayer {...props} />}
    />
};

export const TETRIS_ONLINE = {
    link: '/tetris/multiplayer',
    label: 'Multiplayer',
    description: 'Play vs your friend',
    page: props => <Page
        header={`${TETRIS.label}/multiplayer`}
        component={<MultiPlayer {...props} />}
    />
};


export const ROUTES = [HOME, TETRIS, CROCODILE, TETRIS_SINGLE, TETRIS_ONLINE];
export const GAMES = [TETRIS, CROCODILE];
export const TETRIS_ROUTES = [TETRIS_SINGLE, TETRIS_ONLINE];