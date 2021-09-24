import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeSocket } from '../../asyncActions'

import InputMessage from '../InputMessage'
import MessagesList from '../MessagesList'

import './style.scss'

const Chat = () => {
    const dispatch = useDispatch()
    const isReconnect = useSelector((state) => state.socket.isReconnect)
    let timeout = null

    useEffect(() => {
        dispatch(initializeSocket())

        return () => {
            clearInterval(timeout)
        }
    }, [])

    if (isReconnect) {
        timeout = setInterval(() => {
            dispatch(initializeSocket())
            console.log('Try reconect')
        }, 5000)
    } else {
        clearInterval(timeout)
    }

    return (
        <section className="chat">
            <MessagesList />
            <InputMessage />
        </section>
    )
}

export default Chat
