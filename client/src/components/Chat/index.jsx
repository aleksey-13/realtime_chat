import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setMessages, setSocket } from '../../reducers/chatReducer'

import InputMessage from '../InputMessage'
import MessagesList from '../MessagesList'

import './style.scss'

const Chat = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        connect()
    }, [])

    function connect() {
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

        socket.onclose = () => {
            setTimeout(function () {
                connect()
                console.log('Try reconnect')
            }, 1000)
            console.log('Socket closed')
        }

        socket.onerror = () => {
            socket.close()
            console.log('Socket error')
        }
    }

    return (
        <section className="chat">
            <MessagesList />
            <InputMessage />
        </section>
    )
}

export default Chat
