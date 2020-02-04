import { SOCKET_CHANNEL, META_SOCKET_EMIT } from './constants';

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


export function createSocketEmitMiddleware(socket, channelName=SOCKET_CHANNEL) {
    return store => {
        return next => {
            return action => {
                if(action.meta && action.meta.remote === META_SOCKET_EMIT) {
                    // console.log({
                    //     emit: action
                    // });
                    socket.emit(channelName, action);
                }
                return next(action);
            };
        };
    };
}

// export function apiRequest(socket, channelName=SOCKET_CHANNEL) {
//     return store => {
//         return next => {
//             return action => {
//                 if(action.meta && action.meta.remote === META_SOCKET_EMIT) {
//                     return new Promise((resolve, reject) => {
//                         socket.emit(channelName, action, response => {
//                             if(!response.error) resolve(response);
//                             else reject(response.error);
//                         });
//                     });
//                 }
//                 return next(action);
//             };
//         };
//     };
// }