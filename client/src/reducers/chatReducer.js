const SET_USERNAME = 'SET_USERNAME'
const SET_MESSAGE = 'SET_MESSAGE'
const SET_CONNECTED = 'SET_CONNECTED'
const SET_MESSAGES = 'SET_MESSAGES'
const SET_SOCKET = 'SET_SOCKET'

const defaultState = {
    messagesData: [],
    username: '',
    message: '',
    connected: false,
    socket: null
}

export default function msgReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            }
        case SET_MESSAGES:
            return {
                ...state,
                messagesData: [...state.messagesData, ...action.payload]
            }
        case SET_CONNECTED:
            return {
                ...state,
                connected: action.payload
            }
        case SET_SOCKET:
            return {
                ...state,
                socket: action.payload
            }

        default:
            return state
    }
}

export const setUsername = (username) => ({
    type: SET_USERNAME,
    payload: username
})

export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message
})

export const setConnected = (bool) => ({
    type: SET_CONNECTED,
    payload: bool
})

export const setMessages = (messages) => ({
    type: SET_MESSAGES,
    payload: messages
})

export const setSocket = (socket) => ({
    type: SET_SOCKET,
    payload: socket
})
