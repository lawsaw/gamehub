const ACTION_INIT = {
    type: 'MAIN_API',
    meta: { remote: 'API' },
};

export const TEST_CONNECTION = 'TEST_CONNECTION';
export function apiTestConnection(data) {
    return {
        action: TEST_CONNECTION,
        data,
        ...ACTION_INIT,
    };
}