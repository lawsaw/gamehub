export const TEST_MIDDLEWARE = 'TEST_MIDDLEWARE';
export function testMiddleware(data, st) {
    console.log({data, st});
    return {
        type: TEST_MIDDLEWARE,
        meta: {remote: true},
        data,
    };
}
