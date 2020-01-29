import { createAction } from 'redux-actions';

export const actions = {
    COUNTER_CHECK_CLIENT_VERSION_EVENT: createAction('COUNTER_CHECK_CLIENT_VERSION_EVENT', (version) => {
        return {
            version,
        };
    }),
};