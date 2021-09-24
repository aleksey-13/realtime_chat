import { setMessages } from '../reducers/chatReducer'

const SOCKET_CONNECTION_INIT = 'SOCKET_CONNECTION_INIT'
const SOCKET_CONNECTION_SUCESS = 'SOCKET_CONNECTION_SUCCESS'
const SOCKET_CONNECTION_ERROR = 'SOCKET_CONNECTION_ERROR'
const SOCKET_CONNECTION_CLOSED = 'SOCKET_CONNECTION_CLOSED'

const initialState = {
    connected: false,
    socket: null,
    isReconnect: false
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case SOCKET_CONNECTION_INIT:
            return Object.assign({}, state, {
                connected: false,
                socket: action.socket
            })

        case SOCKET_CONNECTION_SUCESS:
            return Object.assign({}, state, {
                connected: true,
                isReconnect: false
            })

        case SOCKET_CONNECTION_ERROR:
            return Object.assign({}, state, {
                connected: false
            })

        case SOCKET_CONNECTION_CLOSED:
            return Object.assign({}, state, {
                connected: false,
                socket: null,
                isReconnect: true
            })

        default:
            return state
    }
}

export function initializeSocket() {
    return (dispatch) => {
        const socket = new WebSocket('ws://localhost:5000')

        dispatch(socketConnectionInit(socket))

        socket.onopen = function () {
            dispatch(socketConnectionSuccess())

            const message = {
                event: 'connection',
                id: Date.now()
            }

            socket.send(JSON.stringify(message))
        }

        socket.onerror = function () {
            dispatch(socketConnectionError())
        }

        socket.onmessage = function (event) {
            const msgs = JSON.parse(event.data)

            dispatch(setMessages(Array.isArray(msgs) ? msgs : [msgs]))
        }

        socket.onclose = function () {
            dispatch(socketConnectionClosed())
        }
    }
}

function socketConnectionInit(socket) {
    return {
        type: SOCKET_CONNECTION_INIT,
        socket
    }
}

function socketConnectionSuccess() {
    return {
        type: SOCKET_CONNECTION_SUCESS
    }
}

function socketConnectionError() {
    return {
        type: SOCKET_CONNECTION_ERROR
    }
}

function socketConnectionClosed() {
    return {
        type: SOCKET_CONNECTION_CLOSED
    }
}
