import { setMessages, setSocket } from '../reducers/chatReducer'

export const fetchSocket = () => {
    return function connect(dispatch = () => {}) {
        const socket = new WebSocket('ws://localhost:5000')

        dispatch(setSocket(socket))

        socket.onopen = () => {
            const message = {
                event: 'connection',
                id: Date.now()
            }

            socket.send(JSON.stringify(message))

            console.log('Connection success')
        }

        socket.onmessage = (event) => {
            const msgs = JSON.parse(event.data)

            dispatch(setMessages(Array.isArray(msgs) ? msgs : [msgs]))
        }

        socket.onerror = () => {
            socket.close()
            console.log('Socket error')
        }
    }
}
