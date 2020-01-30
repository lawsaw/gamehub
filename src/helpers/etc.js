import { SOCKET_CLIENT } from './constants';

export function getHeightFromWidth(widthNew, width, height) {
    return ( widthNew * height ) / width;
}

export function getWidthFromHeight(heightNew, width, height) {
    return ( heightNew * width ) / height;
}

export function preventMultipleSubmit() {
    let isLocked = false;
    function func(callback) {
        if(!isLocked) {
            isLocked = true;
            callback();
            setTimeout(() => {
                isLocked = false;
            }, 750);
        }
    }
    return func;
}

export function socketRequest(socket, request) {
    socket.emit();
}

export function socketCrocodileRequest(socket, action, request) {
    socket.emit();
}

// export function createSocketMiddleware(socket, channelName='action') {
//     return function (store) {
//         socket.on(channelName, store.dispatch);
//         return function (next) {
//             return function (action) {
//                 if (action.meta && action.meta.remote) {
//                     socket.emit(channelName, action);
//                 }
//                 let request = next(action);
//                 //console.log(a);
//                 //return a;
//             };
//         };
//     };
// }

export function createSocketEmitMiddleware(socket, channelName=SOCKET_CLIENT) {
    return store => {
        //socket.on(channelName, store.dispatch);
        return next => {
            return action => {
                if(action.meta && action.meta.remote === 'socket_emit') {
                    console.log({
                        emit: action
                    });
                    socket.emit(channelName, action);
                }
                return next(action);
            };
        };
    };
}

// export function createSocketListenMiddleware(socket) {
//     return store => {
//         return next => {
//             return act => {
//                 const { type, action, ...props } = act;
//                 if(action.meta && action.meta.remote === 'socket_listen') {
//                     let value = action.state === true ? 'on' : 'off';
//                     socket[value](type, args => action.callback(args));
//                 }
//                 return next(action);
//             };
//         };
//     };
// }